import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RequireAuth = ({ user, children }) => {

    console.log("userRUTAS: ", user);


  // si el usuario está autenticado, renderizar la ruta protegida
  if (user) {
    return children;
  }

  // si el usuario no está autenticado, redireccionar al inicio de sesión
  Swal.fire({
    icon: "error",
    title: "Debes registrarte o loguearte",
    showConfirmButton: false,
    timer: 3000
    
  })
  return <Navigate to="/" />
};

export default RequireAuth;


/*  */