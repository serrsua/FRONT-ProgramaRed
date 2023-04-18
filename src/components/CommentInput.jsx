import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CommentInput = ({ userId, postId }) => {

    const [comment, setComment] = useState("");

    const handleInput = (event) => {
        setComment(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/comments", { userId: Number(userId), postId: Number(postId), comment: comment});
    
            Swal.fire({
              icon: "success",
              title: "Comentario Enviado",
              text: data,
            });
          } catch {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un error al enviar tu comentario",
            });
          }
        
        setComment("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleInput} name="message" value={comment} placeholder="Escribe un comentario..."></input>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CommentInput