import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  const user = useSelector(state => state.loginUser)
 
  const [isLogged, setIsLogged] = useState(false);
  let username = localStorage.getItem("username");

  useEffect(() => {
    let username = localStorage.getItem("username");

    if (username) setIsLogged(true);
    else setIsLogged(false);
  }, [isLogged, username]);

  if (children.type.name === "DashboardAdmin") {
    if (username && !user.isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Acceso prohibido",
        text: "No deberias estar por aqui 🙄",
        showConfirmButton: false,
        timer: 2500,
      });
      return <Navigate to="/home" />;
    }
    else if(!isLogged && !user.isAdmin){
      Swal.fire({
        icon: "error",
        title: "Acceso prohibido",
        text: "No deberias estar por aqui 🙄",
        showConfirmButton: false,
        timer: 2500,
      });
      return <Navigate to="/" />;
    }
  }

  if (!username) {
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
