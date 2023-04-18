import CommentInput from "./CommentInput";
import Comment from "./Comment";

const Comments = ({ userId, postId, comments }) => {
    return(
        <div>
            <CommentInput userId={userId} postId={postId}/>
            <h1>comentarios:</h1>
            {comments?.map(c => (<Comment key={c.id} id={c.id} user={c.User} comment={c.comment} likes={c.likes} createdAt={c.createdAt}/>))}
        </div>
    )
}

export default Comments;