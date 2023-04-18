import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Report = ({ onCancel, username, postId, commentId, type }) => {
  let toReport;

  if (type === "user") toReport = "usuario";
  if (type === "post") toReport = "posteo";
  if (type === "comment") toReport = "comentario";

  const [form, setForm] = useState({
    userId: localStorage.getItem("id"),
    username,
    postId,
    commentId,
    description: "",
  });

  const sendReport = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/report", form);
      await Swal.fire({
        icon: "success",
        title: "Enviado",
        text: data,
        showConfirmButton: true,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: error.message,
        showConfirmButton: true,
      });
      
    } finally {
        onCancel();
    }
    
  };

  console.log("REPORT: ", form.description);

  return (
    <div>
      <form onSubmit={sendReport}>
        <h2>{`¿Por qué motivo reportas este ${toReport}?`}</h2>
        <textarea
          onChange={(e) => {
            setForm({
              ...form,
              description: e.target.value,
            });
          }}
          name="description"
          placeholder="Escribe tu reporte..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit">Subir reporte</button>
      </form>
    </div>
  );
};

export default Report;
