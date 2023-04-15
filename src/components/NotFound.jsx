import { NavLink } from "react-router-dom";
import notFound from "../images/NotFoundGif.gif";

const NotFound = () => {
  const id = localStorage.getItem("id");

  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden lg:col-span-2">
      <img src={notFound} alt="" />
      <NavLink className="p-2 my-2 font-medium rounded-md bg-ligthGreen transition-all duration-500 hover:bg-mediumGreen hover:scale-130" to={!id ? "/" : "/home"}>Volver</NavLink>
    </div>
  );
};

export default NotFound;
