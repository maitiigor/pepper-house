import { FC, useState } from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  faBars,
  faPowerOff,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const signOut = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/");
  };

  return (
    <>
      <a href="" className="px-2 lg:hidden md:visible sm:visible">
      <FontAwesomeIcon
          icon={faBars}
          color="black"
          size="2x"
        />
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
    </>
  );
};

export default Header;
