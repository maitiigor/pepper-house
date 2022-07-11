import { FC, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { orderProps } from "../models/order";
import { userProps } from "../models/user";

const usefetchAllUser= ()  => {

  const [userList, setUserList] = useState<Array<userProps>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
     
      var user: Array<userProps> = []
       snapshot.forEach((doc) =>
         user.push({
           id: doc.id,
           email: doc.data().email,
           full_name: doc.data().full_name,
           phone_number: doc.data().phone_number,
           address: doc.data().address,
           created_at: doc.data().created_at,
           updated_at: doc.data().updated_at,   
         })
       );
       setUserList(user);
       setIsLoading(false)
       setIsError(false)
     });
  
    /* return () => {
      second
    } */
  }, [])
  
  return [userList, isLoading, isError] as const;
}

export default usefetchAllUser;