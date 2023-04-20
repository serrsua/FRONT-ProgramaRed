import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Report = ({ onCancel, username, postId, commentId, type, setReported }) => {
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
      if (!form.description.length) {
        throw new Error("No ingresaste una descripción")
      }
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
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      
    } finally {
        onCancel();
    }
    
  };

  return (
    <>
    <div onClick={()=>{setReported(false)}} className="fixed z-40 h-full w-full bg-slate-400 top-0 right-0"></div>
    <div className="fixed z-50 bg-greenGray top-2 left-1/2 w-[80%] h-[50%] rounded-3xl shadow-shadowBoxOutline col-span-2 transform -translate-x-1/2">
      <form onSubmit={sendReport} className="flex flex-col items-center gap-3">
        <h2 className="font-medium mt-3 text-center">{`¿Por qué motivo reportas este ${toReport}?`}</h2>
        <textarea
          onChange={(e) => {
            setForm({
              ...form,
              description: e.target.value,
            });
          }}
          className={`resize-none border self-center border-gray-400 bg-transparent block w-[60%] px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all ease-in-out`}
          name="description"
          placeholder="Escribe tu reporte..."
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit" className=" bg-red-300 px-2 font-medium py-1 rounded-md transition-all hover:scale-110 hover:bg-red-600 border border-black">Subir reporte</button>
      </form>
    </div>
    </>
  );
};

export default Report;
