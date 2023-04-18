import React from "react";
import logo from "../images/logo.png";
import Login from "../components/Login/Login"
import { NavLink } from "react-router-dom";
import video from "../images/Video2.mp4";


const Landing = () => {
  return (
    <div className=" relative col-span-2 flex items-center">
        <video className="brightness-50   w-screen h-screen object-cover" src={video} autoPlay loop muted></video>
      <div>
        <h1 className="absolute top-0 left-0 w-full font-sans text-center text-4xl md:text-6xl text-green-600 font-bold tracking-widest">
         
          ProgramaRed
        </h1>
       
      </div>
      {/* Hero Section */}
      <div className="fixed DIV_LANDING w-[80%]  grid p-4 bg-slate-400 bg-opacity-50 rounded-md lg:col-span-2 md:my-6 transition-all top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* <div className="relative DIV_LANDING  w-1/2 grid p-3 bg-slate-400 bg-opacity-50 rounded-md lg:col-span-2 md:my-6 transition-all"> */}
        <div className="text-white p-2 ">
          {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ProgramaRed
            </h1> */}
          {/* <h2 className="text-4xl font-bold mb-4">
             ¡Conecta con otros programadores!
          </h2> */}
          {/* <p className="text-lg md:text-xl">
              Comparte conocimientos, colabora en proyectos y mucho más.
            </p> */}
        </div>
        <div className="w-full bg-center bg-cover">
          <div className="flex items-center justify-center h-full text-center"></div>
        </div>

        {/* Main Content */}
        <div className=" max-w-3xl w-full px-4">
          <div className=" md:flex-row items-center justify-center pt-4">
          <h1 className=" absolute top-0 sm:text-ls left-0 w-full mt-2 text-center md:text-2xl  text-black font-md tracking-widest">
          ¡Conecta con otros programadores!
        </h1>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <img
                src={logo}
                alt="logo"
                className="bg-ligthGreen rounded-full w-24 h-24 p-2 animate-spin-slow"
              />
            </div>

          {/* Login Section */}
          <div className="DIV_LOADING-LOGIN max-w-sm w-full mx-auto">
            <Login />
          </div>
          
          <NavLink className="flex justify-center " to="/about">
            <h2 className="text-lg font-bold  items-center px-5  py-3 text-gray-800 mt-4 hover:text-white hover:bg-slate-900 rounded-md p-1 transition-all">
              ¿Qué es ProgramaRed?
            </h2>
          </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;