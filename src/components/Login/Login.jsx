import { useState } from "react";
import { validate } from "./validateLogin";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginAuth0 from "./LoginAuth0";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!form.password && !form.username)
        throw new Error("Debe completar los campos");

      let { data } = await axios.post("/login", form);
      localStorage.setItem("user",JSON.stringify(data.user));

      if (!data.user) throw new Error("El usuario no existe");
      if (data.user.isActive) {
        if (data.user.password !== form.password)
          throw new Error("La contraseña es incorrecta");

        localStorage.setItem("username", JSON.stringify(data.user.username));
        localStorage.setItem("id", JSON.stringify(data.user.id));

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Te Logueaste correctamente",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            navigate(`/profile/${localStorage.getItem("id")}`);
          },
        });
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Tu cuenta se encuentra baneada",
          text: "Por favor comunicate con los admins del sitio",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data,
        showConfirmButton: false,
        timer: 1600,
      });
    }
  };

  return (
    <div className="DIV_LOGIN block w-full my-4">
      <div className="max-w-md mx-auto p-6 bg-slate-400 bg-opacity-70 border-solid rounded-md shadow-xl ">
        <div className="pb-4">
          <h2 className="text-xl font-bold text-green-700 text-center pb-2">
            Inicia sesión con tu cuenta
          </h2>
          <p className="text-center text-xs">
            No tienes una cuenta? Regístrate
            <NavLink to="/signUp" className="text-blue-600">
              aquí
            </NavLink>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de usuario:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Tu nombre de usuario"
              value={form.username}
              onChange={handleInputs}
              className={`border border-gray-300 bg-transparent block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out placeholder:text-slate-200 ${
                errors.username
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
            `}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={form.password}
              onChange={handleInputs}
              className={`border border-gray-300 bg-transparent block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out placeholder:text-slate-200 ${
                errors.password
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500 focus:border-green-500"
              }
            `}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`text-white font-semibold py-1 px-2 rounded mt-3
                    ${
                      errors.password || errors.username
                        ? "bg-red-500 hover:bg-red-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className=" border-t border-t-gray-500 mt-3">
          <p className="text-center text-xs">Logeate con google o github</p>
          <LoginAuth0 />
        </div>
      </div>
    </div>
  );
};

export default Login;
