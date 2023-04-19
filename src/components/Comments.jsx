import CommentInput from "./CommentInput";
import Comment from "./Comment";

const Comments = ({ userId, postId, comments, toggleDetails }) => {
  return (
    <div className="flex flex-col">
      <CommentInput userId={userId} postId={postId} />
      <h3 className="font-bold mb-2">Comentarios:</h3>
      <div className="flex flex-col gap-2">
        {comments?.map((c) => (
          <Comment
            toggleDetails={toggleDetails}
            key={c.id}
            id={c.id}
            userId={userId}
            postId={postId}
            user={c.User}
            comment={c.comment}
            likes={c.likes}
            createdAt={c.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
