import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  const { pathname } = useLocation();
 
  let user = JSON.parse(localStorage.getItem("user"))

  if (children.type.name === "DashboardAdmin") {
    //preguntar por la ruta
    if (pathname !== "/" || pathname !== "/about" || pathname !== "signUp") {
      if (!user?.username) {
        Swal.fire({
          icon: "error",
          title: "Acceso prohibido",
          text: "No deberias estar por aqui 🙄",
          showConfirmButton: false,
          timer: 2500,
        });
        return <Navigate to="/" />;
      } //si existe el localStorage pregunta por isAdmin
      else if(user?.username && !user?.isAdmin){
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

  if (!user?.username) {
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