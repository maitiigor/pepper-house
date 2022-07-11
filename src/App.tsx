import { useState } from "react";
import "./App.css";
import SideBar from "./layout/AppLayOut";
import { Home, Menu, Order, User, Login } from "./pages";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import RequiredAuth from "./provider/Authentcated";
import IsAuthenticated from "./provider/IsAuthenticated";
import { auth } from "./config/firebase";
import CheckAuth from "./provider/IsAuthenticated";
import AppLayOut from "./layout/AppLayOut";
import ReactModal from "react-modal";

function App() {
  const [count, setCount] = useState(0);
    ReactModal.setAppElement('#root');
  
  const [isAuth, setisAuth] = useState<boolean>(auth.currentUser?.uid ? true : false)
  console.log(isAuth);
  return (
    <div className="flex flex-row">
      {/*  <SideBar></SideBar> */}
      
      <Routes>
        <Route path="/" element={<CheckAuth></CheckAuth>} />
        <Route path="/dashboard" element={<RequiredAuth><AppLayOut title="Home"><Home /></AppLayOut></RequiredAuth>} />
        <Route path="/users" element={<RequiredAuth><AppLayOut title="Users"><User /></AppLayOut></RequiredAuth>} />
        <Route path="/orders" element={<RequiredAuth><AppLayOut title="Orders"><Order /></AppLayOut></RequiredAuth>} />
        <Route path="/menus" element={<RequiredAuth><AppLayOut title="Menus"><Menu /></AppLayOut></RequiredAuth>} />
  
      </Routes>
    </div>
  );
}

export default App;
