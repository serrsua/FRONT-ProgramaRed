import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CommentInput = ({ userId, postId }) => {
  const [comment, setComment] = useState("");

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/comments", {
        userId: Number(userId),
        postId: Number(postId),
        comment: comment,
      });

      Swal.fire({
        icon: "success",
        title: "Comentario Enviado",
        text: data,
        timer: 1000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al enviar tu comentario",
        timer: 1000,
        showConfirmButton: false,
      });
    }

    setComment("");
  };

  return (
    <div className="my-3 ml-2 flex justify-center">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          className=" border-2 border-cyan-700 px-2 py-1 font-medium rounded-md focus:outline-2 focus:outline-blue-700"
          onChange={handleInput}
          name="message"
          value={comment}
          placeholder="Escribe un comentario..."
        />
        <button type="submit">
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
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
