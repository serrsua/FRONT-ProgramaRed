import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  const { pathname } = useLocation();
  const { user, isAuthenticated } = useAuth0();
 
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  let userLogged = !isAuthenticated ? JSON.parse(localStorage.getItem("user")) : {...user, isAdmin: false, username: user.nickname}

  console.log("userLogged", userLogged);

  if (children.type.name === "DashboardAdmin") {
    //preguntar por la ruta
    if (pathname !== "/" || pathname !== "/about" || pathname !== "signUp") {
      if (!userLogged?.username) {
        Swal.fire({
          icon: "error",
          title: "Acceso prohibido",
          text: "No deberias estar por aqui 🙄",
          showConfirmButton: false,
          timer: 2500,
        });
        return <Navigate to="/" />;
      } //si existe el localStorage pregunta por isAdmin
      else if(userLogged?.username && !userLogged?.isAdmin){
        Swal.fire({
          icon: "error",
          title: "Acceso prohibido",
          text: "No deberias estar por aqui 🙄",
          showConfirmButton: false,
          timer: 2500,
        });
        return <Navigate to="/home" />;
      }
    }
  }

  if (!userLogged?.username) {
    Swal.fire({
      icon: "error",
      title: "Debes registrarte o loguearte",
      showConfirmButton: false,
      timer: 2500,
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;