const CommentsList = ({comments}) => (
    <>
    <div className="comment-form">
        <h3>Comments:</h3>
        {comments?.map(comment => (
            <div className="comment" key={comment.postedBy + ': ' + comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </div>
    </>
)

export default CommentsList