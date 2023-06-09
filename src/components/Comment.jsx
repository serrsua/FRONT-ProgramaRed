import Swal from "sweetalert2";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostById } from "../redux/actions";
import Report from "./Report";
import { useState } from "react";

const Comment = ({ comment, user, userId, id, postId, toggleDetails }) => {
  const [reported, setReported] = useState(false);
  const dispatch = useDispatch();

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
        dispatch(getPostById(postId));
      }
    });
  };

  const editHandler = () => {
    Swal.fire({
      title: "Edita tu comentario",
      input: "text",
      inputValue: comment,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Editar",
      showLoaderOnConfirm: true,
      preConfirm: async (event) => {
        try {
          const { data } = await axios.put(`/comments/${id}`, {
            comment: event,
          });
          Swal.fire({
            icon: "success",
            title: "Comentario Editado",
            text: data,
          });
          dispatch(getPostById(postId));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al editar el comentario",
          });
        }
      },
    });
  };

  return (
    <div className="relative border border-blue-200 py-2 px-1">
      <p className="text-green-800 text-base">
        <NavLink
          onClick={() => {
            toggleDetails();
          }}
          className="font-medium transition-all hover:text-green-600"
          to={`/profile/${userId}`}
        >
          {user.username}
        </NavLink>
        dice:
      </p>
      <p className="text-amber-600 text-sm font-medium">{comment}</p>
      <div className="absolute top-1 right-1">
        {Number(user.id) === Number(userId) && (
          <div>
            <button onClick={editHandler}>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
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
          </div>
        )}
      </div>

      {/* Report Button */}

      <div className="absolute top-1 right-1">
        {Number(userId) !== Number(user.id) ? (
          <>
            <button onClick={() => setReported(true)} type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                title="Reportar"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </button>
            {reported && (
              <Report
                setReported={setReported}
                onCancel={() => setReported(false)}
                commentId={id}
                type={"comment"}
              />
            )}
            {reported && (
              <span
                className=" cursor-pointer"
                onClick={() => setReported(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:scale-125"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;

/* 

*/
