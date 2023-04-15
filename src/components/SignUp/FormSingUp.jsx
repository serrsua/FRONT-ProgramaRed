import { useState } from "react";
import validate from "./validate";
import { useDispatch } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormSignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [property]: value,
    });

    setErrors(validate({ ...form, [property]: value }));
  };

  const clearForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
    });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = await axios.post("/register", form);
      Swal.fire({
        icon: "success",
        title: info.data,
        showConfirmButton: false,
        timer: 1200,
      })
      clearForm();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 2000,
      })
    }
  };

  return (
    
    <div className="DIV_FORM_SIGN p-3 lg:col-span-4 md:my-6 transition-all">
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h3 className=" self-center text-xl font-bold text-green-700 mb-6">Registrarse</h3>
        <p className=" self-center">
          Ya tienes una cuenta logeate <NavLink className=" font-bold text-green-800" to="/">aquí</NavLink>
        </p>
        <form
          className=" gap-4
         flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ">
            <label>Nombre de usuario: </label>
            <input
              onChange={changeHandler}
              placeholder="Escribe tu nombre de usuario..."
              type="text"
              name="username"
              value={form?.username}
              className={`border-gray-300 block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                errors.username
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
              `}
            />
            <span className="text-red-500 text-sm">{errors?.username}</span>
          </div>

          <div className="flex flex-col ">
            <label>Email: </label>
            <input
              onChange={changeHandler}
              placeholder="Escribe tu email..."
              type="text"
              name="email"
              value={form?.email}
              className={`border-gray-300 block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                errors.email
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
              `}
            />
            <span className="text-red-500 text-sm">{errors?.email}</span>
          </div>

          <div className="flex flex-col ">
            <label>Contraseña: </label>
            <input
              onChange={changeHandler}
              type="password"
              name="password"
              value={form?.password}
              className={`border-gray-300 block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                errors.password
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
              `}
            />
            <span className="text-red-500 text-sm">{errors?.password}</span>
          </div>

          <button
            className="flex self-center bg-mediumGreen text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  
  );
};

export default FormSignUp;
