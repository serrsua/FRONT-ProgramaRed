import "./dir/tailwind.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import CreatePost from "./views/CreatePost/CreatePost";
import Profile from "./views/Profile/Profile";
import SignUp from "./views/SignUp";
import NavBar from "./components/NavBar";
import Payment from "./views/Payment";
import Favorites from "./views/Favorites"
import { useState } from "react";
import FalseScreen from "./components/FalseScreen";
import Detail from "./views/Detail";
import About from "./views/About";
import NotFound from "./components/NotFound";
import DashboardAdmin from "./views/DashboardAdmin";
import EditPost from "./views/EditPost/EditPost";
import { ReportDetail } from "./views/ReportDetail";
import RequireAuth from "./views/RequireAuth ";

function App() {
  const { pathname } = useLocation();

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className={`DIV_APP grid justify-center bg-veryLigthGreen lg:grid-cols-desktop_lg xl:grid-cols-desktop_xl ${pathname === "/" ? "lg:grid-cols-1 justify-items-center" : ""} ${pathname === "/home" ? "h-screen" : ""}${pathname === "/premium" ? "grid-rows-4 lg:grid-rows-1" : ""}${pathname === "/about" ? "grid-rows-1 lg:grid-cols-1" : ""}`}>
      {/*  {pathname !== "/" && pathname !== "/signUp" && pathname !== "/about" && <NavBar />} */}
      {(pathname.startsWith("/profile") || pathname === "/home" || pathname === "/createPost" || pathname === "/editPost" || pathname === "/favorites" || pathname === "/singUp" || pathname === "/premium") && <RequireAuth><NavBar /></RequireAuth>}
      {showDetails && <FalseScreen isView={showDetails} toggleDetails={toggleDetails} />}
      {showDetails && <Detail toggleDetails={toggleDetails} />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={ <RequireAuth><Home toggleDetails={toggleDetails} /></RequireAuth>} />
        <Route path="/createPost" element={<RequireAuth><CreatePost /></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><Profile toggleDetails={toggleDetails} /></RequireAuth>  } />
        <Route path="/favorites" element={ <RequireAuth><Favorites toggleDetails={toggleDetails} /></RequireAuth> } />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/premium" element={<RequireAuth><Payment /></RequireAuth> } />
        <Route path="/admin" element={ <DashboardAdmin />} />
        <Route path="/editPost" element={ <RequireAuth><EditPost/></RequireAuth> } />
      </Routes>
    </div>
  );
}

export default App;
