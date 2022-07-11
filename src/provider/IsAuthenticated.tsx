import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { Children, FC } from "react";
import { auth } from "../config/firebase";
import { Home, Login } from "../pages";





  function CheckAuth(){

      let authToken = sessionStorage.getItem('Auth Token')
     const navigate = useNavigate()

     return (
      authToken ? <Home></Home> : <Login></Login>
     )
   
    
      
  }

export default CheckAuth
  