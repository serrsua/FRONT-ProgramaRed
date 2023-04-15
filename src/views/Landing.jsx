import React from "react";
import logo from "../images/logo.png";
import Login from "../components/Login/Login"
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="DIV_LANDING grid p-3 bg-slate-400 lg:col-span-2 md:my-6 transition-all">
      {/* Hero Section */}
      <div className="w-full bg-center bg-cover">
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-white p-2 ">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ProgramaRed
            </h1>
          <h2 className="text-4xl font-bold mb-4">
             ¡Conecta con otros programadores!
          </h2>
            <p className="text-lg md:text-xl">
              Comparte conocimientos, colabora en proyectos y mucho más.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl w-full px-4">
        <div className="flex flex-col md:flex-row items-center justify-center pt-4">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="logo"
              className="bg-ligthGreen rounded-full w-24 h-24 p-2 animate-spin-slow"
            />
            <NavLink to="/about" >
              <h2 className="text-lg font-bold px-5 py-3 text-gray-800 mt-4 hover:text-white hover:bg-slate-900 rounded-md p-1 transition-all">¿Qué es ProgramaRed?</h2>
            </NavLink>
          </div>
        </div>

        {/* Login Section */}
        <div className="DIV_LOADING-LOGIN max-w-sm w-full mx-auto">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Landing;