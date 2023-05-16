import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ toUpdate, toUpdateName, onUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser('');

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};

        const response = await axios.post(`/api/${toUpdate}/${toUpdateName}/comments`, {
            postedBy: name,
            text: commentText
        },{ headers });
        
        const updated = response.data;
        onUpdated(updated);
        setName('');
        setCommentText('');
    }

    return (
        <div>
            <h3>Add a comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            <label>
                Comment:
                <textarea
                    value = {commentText}
                    onChange = {e=> setCommentText(e.target.value)} 
                    rows="4" cols="50" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;