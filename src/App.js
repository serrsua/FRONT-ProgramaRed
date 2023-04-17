import "./dir/tailwind.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import CreatePost from "./views/CreatePost/CreatePost";
import Profile from "./views/Profile/Profile";
import SignUp from "./views/SignUp";
import NavBar from "./components/NavBar";
import Payment from "./views/Payment";
import Favorites from "./views/Favorites"
import { useEffect, useState } from "react";
import FalseScreen from "./components/FalseScreen";
import Detail from "./views/Detail";
import About from "./views/About";
import NotFound from "./components/NotFound";
import DashboardAdmin from "./views/Admin";
import EditPost from "./views/EditPost/EditPost";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const [ access, setAccess ] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  useEffect(()=>{
    if (!access && (pathname !== "/" && pathname !== "/about" && pathname !== "signUp")) {
      navigate("/")
    }
  },[access, navigate])

  return (
    <div className={`DIV_APP grid justify-center bg-veryLigthGreen lg:grid-cols-desktop_lg xl:grid-cols-desktop_xl ${pathname === "/" ? "lg:grid-cols-1 justify-items-center" : ""} ${pathname === "/home" ? "h-screen" : ""}${pathname === "/premium" ? "grid-rows-4 lg:grid-rows-1" : ""}${pathname === "/about" ? "grid-rows-1 lg:grid-cols-1" : ""}`}>
      {/*  {pathname !== "/" && pathname !== "/signUp" && pathname !== "/about" && <NavBar />} */}
      {(pathname.startsWith("/profile") || pathname === "/home" || pathname === "/createPost" || pathname === "/editPost" || pathname === "/favorites" || pathname === "/singUp" || pathname === "/premium") && <NavBar setAccess={setAccess} />}
      {showDetails && <FalseScreen isView={showDetails} toggleDetails={toggleDetails} />}
      {showDetails && <Detail toggleDetails={toggleDetails} />}
      <Routes>
        <Route path="/" element={<Landing setAccess={setAccess} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
        {
          access && (
          <>
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Home toggleDetails={toggleDetails} />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile/:id" element={<Profile toggleDetails={toggleDetails} />} />
            <Route path="/favorites" element={<Favorites toggleDetails={toggleDetails} />} />
            <Route path="/premium" element={<Payment />} />
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/editPost" element={<EditPost/>} />
          </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
