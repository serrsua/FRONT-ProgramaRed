import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  // const user = useSelector(state => state.loginUser)

  // console.log("userRUTAS: ", user);
  const [isLogged, setIsLogged] = useState(false);
  let username = localStorage.getItem("username");

  useEffect(() => {
    let username = localStorage.getItem("username");

    if (username) setIsLogged(true);
    else setIsLogged(false);
  }, [isLogged, username]);

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
