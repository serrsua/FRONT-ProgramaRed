import { useState } from "react";
import validate from "./validate";
import { useDispatch } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../images/fondoregistro_adobe_express.svg";

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
      const response = await axios.post("/subcriptionsEmail", {
        username: form.username,
        email: form.email,
        type: "Registro",
      });
      Swal.fire({
        icon: "success",
        title: info.data,
        text: response.data,
        showConfirmButton: false,
        timer: 1600,
      });
      clearForm();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="DIV_FORM_SIGN absolute flex items-center ">
      <img className="brightness-50 w-screen h-screen object-cover" src={img} />

      <div className="  absolute top-20 left-0 w-full text-lg md:text-xl text-black font-mediun">
        <div className="flex flex-col max-w-md mx-4 sm:mx-auto p-6 bg-slate-400 rounded-md shadow-xl bg-opacity-70">
          <h3 className=" self-center text-3xl font-bold text-green-500 mb-6">
            Registrarse
          </h3>
          <p className=" self-center mb-10">
            Si tienes una cuenta logeate{" "}
            <NavLink className=" font-bold text-green-500 hover:text-green-400" to="/">
              aquí
            </NavLink>
          </p>
          <form
            className=" gap-4 flex flex-col text-base"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario:
              </label>
              <input
                onChange={changeHandler}
                placeholder="Escribe tu nombre de usuario..."
                type="text"
                name="username"
                value={form?.username}
                className={`border border-gray-300 bg-transparent block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out placeholder:text-slate-200 ${
                  errors.username
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:ring-green-500 focus:border-green-500"
                }
              `}
              />
              <span className="text-red-500 text-sm">{errors?.username}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Email:{" "}
              </label>
              <input
                onChange={changeHandler}
                placeholder="Escribe tu email..."
                type="text"
                name="email"
                value={form?.email}
                className={`border border-gray-300 bg-transparent block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out placeholder:text-slate-200 ${
                  errors.email
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:ring-green-500 focus:border-green-500"
                }
                `}
              />
              <span className="text-red-500 text-sm">{errors?.email}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Contraseña:{" "}
              </label>
              <input
                onChange={changeHandler}
                placeholder="Escribe tu contraseña..."
                type="password"
                name="password"
                value={form?.password}
                className={`border border-gray-300 bg-transparent block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out placeholder:text-slate-200 ${
                  errors.password
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:ring-green-500 focus:border-green-500"
                }
              `}
              />
              <span className="text-red-500 text-sm">{errors?.password}</span>
            </div>

            <button
              className={`text-white font-semibold py-1 px-4 rounded mt-3 self-center
              ${
                errors.username || errors.email || errors.password
                  ? "bg-red-500 hover:bg-red-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
