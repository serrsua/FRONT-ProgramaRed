import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RequireAuth = ({ children }) => {

    const user = useSelector(state => state.loginUser)

    console.log("userRUTAS: ", user);


  // si el usuario está autenticado, renderizar la ruta protegida
  if (Object.keys(user).length === 0) {
    Swal.fire({
        icon: "error",
        title: "Debes registrarte o loguearte",
        showConfirmButton: false,
        timer: 3000
        
      })
      return <Navigate to="/" />    
  }
  // si el usuario no está autenticado, redireccionar al inicio de sesión
  
  return children;
};

export default RequireAuth;

