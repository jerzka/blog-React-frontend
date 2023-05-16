import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import useUser from '../hooks/useUser';
import projects from './project-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';

const ProjectPage = () => {
    const [projectInfo, setProjectInfo] = useState({name: '', upvotes: 0, comments: [], canUpvote: false});
    const { canUpvote } = projectInfo;
    const { projectId } = useParams();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadProjectInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {}; //in axios token can be string 'null'
            const response = await axios.get(`/api/projects/${projectId}`, { headers }); //because proxy in package.json is setup no need to write http://localhost:8000 - proxy prevent CORS-Origin-Errors
            const newProjectInfo = response.data;
            setProjectInfo(newProjectInfo);
        }
        if(!isLoading){
            loadProjectInfo();
        }
    }, [isLoading, user]);
    
    const project = projects.find(project => project.name === projectId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        //second parameter is axios PUT request body
        const response = await axios.put(`/api/projects/${projectId}/upvote`, null, { headers });
        const updatedProject = response.data;
        setProjectInfo(updatedProject);
    }

    if(!project){
        return <NotFoundPage />
    }
    
    return (
        <>
        <h1>{project.title}</h1>
        <div className="upvotes-section">
        {user
            ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already upvoted'}</button>
            : <button onClick={() => {
                navigate('/login');
            }}>Log in to upvote</button>
        }
        <p>This project has { projectInfo.upvotes } vote(s)</p>
        </div>
        {project.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        {user
            ? <AddCommentForm 
                toUpdate={"projects"}
                toUpdateName={projectId}
                onUpdated={updatedProject => setProjectInfo(updatedProject)}
            />
            : <button onClick={() => {
                navigate('/login');
            }}>Log in to add a comment</button>
        }
        <CommentsList comments={projectInfo.comments} />
        </>
    )
}


export default ProjectPage;