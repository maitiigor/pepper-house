import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { menuProps } from "../models/menu";

type fetchAllMenuHookType = {
  menuList: Array<menuProps>,
  isLoading: boolean,
  isError: boolean
}

export const useFetchAllMenu  = ()  => {

  const [menuList, setMenuList] = useState<Array<menuProps>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => { 
  db.collection("menus").get().then((snapshot) =>{
    console.log(snapshot.docs.length);
    var menu: Array<menuProps> = [];
     snapshot.forEach((doc) =>
       menu.push({
         id: doc.id,
         name: doc.data().name,
         price: doc.data().price,
         description: doc.data().description,
         image_url: doc.data().image_url,
         created_at: doc.data().created_at,
         updated_at: doc.data().updated_at,
       })
     );
     setIsLoading(false)
     setIsError(false)
     setMenuList(menu)
  })
}, [])
   return [menuList,isLoading,isError] as const 
};

