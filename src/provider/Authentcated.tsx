import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { Children, FC } from "react";
import { auth } from "../config/firebase";



type WithChildren<T = {}> = 
  T & { children?: React.ReactNode };

type RequiredAuthProps = WithChildren<{

}>

  function RequiredAuth({children}:RequiredAuthProps){
     
    let authToken = sessionStorage.getItem('Auth Token')
       if(!authToken){
           return (
               <Navigate to="/"></Navigate>
           )
       }else{
        return(
            <>
             {children}
            </>
        )
       }
      
  }

export default RequiredAuth
  