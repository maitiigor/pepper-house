import { Children, FC, useRef, useState } from "react";
import logo from "../asset/images/logo.jpeg";
import {
  faClose,
  faHome,
  faPowerOff,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faUtensils, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import ReactModal from "react-modal";



type WithChildren<T = {}> = 
  T & { children?: React.ReactNode };

type MainPage = WithChildren<{
  title: string;
}>

type HeaderProps = {
  title: string;
};

function AppLayOut({children,title}:MainPage) {
  
 //ReactModal.setAppElement('#maincontent');
  const [openNavBar, setopenNavBar] = useState(false);
  const navigate = useNavigate();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const toggleBar = () => {
    setopenNavBar(!openNavBar)
    sideBarRef.current?.classList.toggle('-left-full')
    //sideBarRef.current?.classList.toggle('absolute')
    /* sideBarRef.current?.classList.toggle('left-0')
    sideBarRef.current?.classList.toggle('relative') */

   // setopenNavBar(!openNavBar)
  }

  const signOut = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/");
  };
  return (
    <>
      {/*  <a href="#" className="absolute px-2 z-30" onClick={() => setopenNavBar(!openNavBar)}>
        { openNavBar ? <FontAwesomeIcon
          icon={faBars}
          color="black"
          size="2x"
        ></FontAwesomeIcon>: <FontAwesomeIcon
        icon={faClose}
        color="black"
        size="2x"
      ></FontAwesomeIcon>}
      </a> */}
      {/*  <div className="fixed pl-3 pt-2 z-30"> */}
      <div ref={sideBarRef}
        className={`h-screen px-1 w-60 absolute -left-full lg:relative lg:left-0 bg-red-600 lg:w-60 text-white overflow-hidden`}
      >
        <div>
          <img src={logo} alt="" className="rounded-br-3xl rounded-bl-3xl" />
        </div>

        <ul className="pt-8">
          <li className="flex flex-row w-full">
            <Link
              to="/dashboard"
              className="font-bold  text-xl flex items-center my-2 py-5 w-full pl-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                className={`py-2 px-4`}
                icon={faHome}
                size="2x"
                color="yellow"
              />
              Dashboard
            </Link>
          </li>
          <li className="relative flex flex-row">
            <Link
              to="/menus"
              className="font-bold  text-xl flex items-center my-2 py-4 w-full pl-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                className={`py-2 px-6`}
                icon={faUtensils}
                size="2x"
                color="yellow"
              />
              Menu
            </Link>
          </li>
          <li className="relative flex flex-row">
            <Link
              to="/users"
              className="font-bold  text-xl flex items-center my-2 py-4 w-full pl-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                className={`py-2 px-4`}
                icon={faUsers}
                size="2x"
                color="yellow"
              />
              Users
            </Link>
          </li>
          <li className="flex flex-row">
            <Link
              to="/orders"
              className="font-bold  text-xl flex items-center my-2 py-4 pl-4 w-full h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                className={`py-2 px-4`}
                icon={faShoppingCart}
                size="2x"
                color="yellow"
              />
              Orders
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-screen p-8 overflow-auto h-screen" id="maincontent">
        <div className="grid grid-cols-3 gap-2 text-left">
          <a href="#" className={`px-2 lg:hidden md:visible z-30 w-8 ${openNavBar ? "bg-yellow-200" : ""}`} onClick={() => toggleBar()}>
           { openNavBar ? <FontAwesomeIcon icon={faClose} color="green" size="2x" />: <FontAwesomeIcon icon={faBars} color="red" size="2x" />}
          </a>
          <div className="col-span-3">
            <div className="text-right">
              <a href="#" onClick={signOut}>
                <FontAwesomeIcon
                  icon={faPowerOff}
                  size="2x"
                  color="red"
                ></FontAwesomeIcon>
              </a>
            </div>
          </div>
          <div className="col-span-2">
            <b className="font-bold text-xl"> {title}</b>
          </div>
          <div className="col-span-1">
            {/* <span>
              <input type="text" name="" placeholder='search' className='border-2 rounded-lg w-70 h-full p-2' />
              <button className='h-full w-40 ml-2 bg-red-600 border-1 text-white rounded-lg' type='button'> Search</button>
              </span> */}
          </div>
        </div>
        {children}
      </div>
      
      {/*  <a href="#">
          <FontAwesomeIcon
            icon={faBars}
            color="black"
            size="2x"
          ></FontAwesomeIcon>
        </a> */}
      {/* </div> */}
      {/*  <div
        className={openNavBar ? "-translate-x-2/4 relative flex -left-52" : ""}
      >
        <div className="bg-red-500 text-white z-50 h-screen w-100">
          <img src={logo} alt="" className="rounded-br-3xl rounded-bl-3xl" />
          <div className="p-3 grid grid-cols-3 gap-10 text-left">
            <div className="pl-3 col-span-1">
              <FontAwesomeIcon icon={faHome} size="2x" color="yellow" />
            </div>
            <div className="text-left col-span-2 fixed">
              <Link to="/dashboard" className="font-bold  text-xl">
                Dahsboard
              </Link>
            </div>

            <div className="pl-3 col-span-1">
              <FontAwesomeIcon icon={faUtensils} size="2x" color="yellow" />
            </div>
            <div className="text-left col-span-2">
              <Link to="/menus" className="font-bold  text-xl">
                Menu
              </Link>
            </div>
            <div className="pl-3 col-span-1 ">
              <FontAwesomeIcon icon={faUsers} size="2x" color="yellow" />
            </div>
            <div className="text-left col-span-2">
              <Link to="/users" className="font-bold  text-xl">
                Users
              </Link>
            </div>
            <div className="pl-3 col-span-1 fixed">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" color="yellow" />
            </div>
            <div className="text-left col-span-2">
              <Link to="/orders" className="font-bold  text-xl">
                Orders
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default AppLayOut;
