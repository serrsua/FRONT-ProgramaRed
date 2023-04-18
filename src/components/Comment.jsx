const Comment = ({ comment, user }) => {
    return(
        <div>
            <h1>{user.username} dice:</h1>
            <p>{comment}</p>
        </div>
    )
}

export default Comment;