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
      <div className="fixed DIV_LANDING w-[80%] flex flex-col p-4 justify-center bg-slate-400 bg-opacity-50 rounded-md lg:col-span-2 md:my-6 transition-all top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

        {/* Main Content */}
        <div className=" max-w-3xl w-full px-4 self-center">
          <div className="flex flex-col items-center justify-center pt-4">
          <h1 className=" fixed top-0 sm:text-lg left-0 w-full my-3 text-center md:text-2xl  text-black font-medium tracking-widest">
          ¡Conecta con otros programadores!
        </h1>
            <div className="flex flex-col items-center my-4">
              <img
                src={logo}
                alt="logo"
                className="bg-ligthGreen rounded-full w-24 h-24 p-2 animate-spin-slow"
              />
            </div>

          {/* Login Section */}
          <div className="DIV_LOADING-LOGIN max-w-sm w-full mx-auto relative top-3">
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