import Swal from "sweetalert2";
import axios from "axios";

const Comment = ({ comment, user, userId, id, postId }) => {

    const deleteComment = async () => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "No puedes revertir esta acción",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Confirmar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete("/comments", { data: {id: Number(id), postId: Number(postId)}});
            await Swal.fire({
              title: "Comentario borrado",
              icon: "success",
              timer: 1200,
            });
            window.location.reload()
          }
        });
      };

    return(
        <div>
            <h1>{user.username} dice:</h1>
            <p>{comment}</p>
            <div>
            {Number(user.id) === Number(userId) && <button onClick={deleteComment}>eliminar </button>}
            </div>
        </div>
    )
}

export default Comment;