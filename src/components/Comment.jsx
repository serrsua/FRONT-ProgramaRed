import Swal from "sweetalert2";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Comment = ({ comment, user, userId, id, postId, toggleDetails }) => {
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
        await axios.delete("/comments", {
          data: { id: Number(id), postId: Number(postId) },
        });
        await Swal.fire({
          title: "Comentario borrado",
          icon: "success",
          timer: 1200,
        });
        window.location.reload();
      }
    });
  };

  return (
    <div className="relative border border-blue-200 py-2 px-1">
      <p className="text-green-800 text-base">
        <NavLink
          onClick={()=>{toggleDetails()}}
          className="font-medium transition-all hover:text-green-600"
          to={`/profile/${userId}`}
        >
          {user.username}
        </NavLink>{" "}
        dice:
      </p>
      <p className="text-amber-600 text-sm font-medium">{comment}</p>
      <div className="absolute top-1 right-1">
        {Number(user.id) === Number(userId) && (
          <button onClick={deleteComment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#B91C1C"
              className="w-5 h-5 hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
