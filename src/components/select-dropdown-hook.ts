import { useEffect, useRef, useState } from "react";


export const useDropDownHandler  = ()  => {

    const [openDropDown, setopenDropDown] = useState(false)
    const dropDownRef = useRef<HTMLDivElement>(null)

   /*  const handleClickOutSideRef = (ev: React.MouseEvent) => {
        console.log("dddddd");

        
       
        
        if(dropDownRef.current){

          if(dropDownRef.current.contains(ev.currentTarget)){
              console.log("yes");
              console.log(dropDownRef.current.ATTRIBUTE_NODE);
              
              console.log(ev.currentTarget);
              
              
          }else{
            console.log("no");
            console.log(dropDownRef.current.cont);
              
              console.log(ev.currentTarget.DOCUMENT_POSITION_CONTAINS);
          }
         
        }else{
          setopenDropDown(false)
          console.log("hw");
        }

    }
    function handleClickOutSideRef(params:type) {
      
    } */

   /*  const handleClickOutSideRef =  (ev: React.MouseEvent) : void => {
      let target = ev.target as Node
      var isClickInsideElement = dropDownRef?.current?.contains(target);
      if (!isClickInsideElement) {
        setopenDropDown(false)
       console.log("here");
       
      }
    }  */

    useEffect(() => {
      document.addEventListener('click', function(event) {
        let target = event.target as Node
        var isClickInsideElement = dropDownRef?.current?.contains(target);
        if (!isClickInsideElement) {
          setopenDropDown(false)
         console.log("here");
         
        }
      }) 
    
      return () => {
        document.removeEventListener("click",function(event) {
          let target = event.target as Node
          var isClickInsideElement = dropDownRef?.current?.contains(target);
          if (!isClickInsideElement) {
            setopenDropDown(false)
           console.log("here");
           
          }
        }) 
      }
    }, [])
    
   return [dropDownRef,openDropDown,setopenDropDown] as const
};

