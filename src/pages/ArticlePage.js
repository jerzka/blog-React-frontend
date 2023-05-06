import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import articles from './article-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({name: '', upvotes: 0, comments: [], canUpvote: false});
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {}; //in axios token can be string 'null'
            const response = await axios.get(`/api/articles/${articleId}`,{ headers }); //because proxy in package.json is setup no need to write http://localhost:8000 - proxy prevent CORS-Origin-Errors
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(isLoading){
            loadArticleInfo();
        }
    }, [isLoading, user]);
    
    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        //second parameter is axios PUT request body
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article){
        return <NotFoundPage />
    }
    
    return (
        <>
        <h1>{article.title}</h1>
        {user
            ?<button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already upvoted'}</button>
            :<button onClick={() => {
                navigate('/login');
            }}>Log in to upvote</button>
        }
        <p>This article has { articleInfo.upvotes } vote(s)</p>
        {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        {user
            ?<AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
            />
            :<button onClick={() => {
                navigate('/login');
            }}>Log in to add a comment</button>
        }
        <CommentsList comments={articleInfo.comments} />
        </>
    )
}


export default ArticlePage;