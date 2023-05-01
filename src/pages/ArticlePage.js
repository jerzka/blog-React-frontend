import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import articles from './article-content';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({name: '', upvotes: 0, comments: []});
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`); //because proxy in package.json is setup no need to write http://localhost:8000 - proxy prevent CORS-Origin-Errors
            const newArticleInfo = response.data;
            //setArticleInfo({upvotes: Math.ceil(Math.random() * 10), commment: []});
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, [articleId]);
    
    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article){
        return <NotFoundPage />
    }
    
    return (
        <>
        <h1>{article.title}</h1>
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has { articleInfo.upvotes } vote(s)</p>
        {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        <AddCommentForm 
            articleName={articleId}
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
        />
        <CommentsList comments={articleInfo.comments} />
        </>
    )
}


export default ArticlePage;