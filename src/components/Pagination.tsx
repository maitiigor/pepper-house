import React, { FC, useEffect, useRef, useState } from "react";
import { faCaretSquareDown, faSquareCaretLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDropDownHandler} from './select-dropdown-hook'
import { useAppDispatch } from "../app/hook";
import {useFetchAllOrderQuery} from '../features/orders/apiOrderSlice'

type WithChildren<T = {}> = T & { children?: React.ReactNode };

interface IPagination{
    total_pages: number,
    setCurrentPage:  React.Dispatch<React.SetStateAction<number>>
    currentPage: number
}

const Pagination = ({total_pages,currentPage, setCurrentPage}: IPagination) => {

   /*  const {
        data: categories = [],
      } = useFetchAllOrderQuery(); */
    let pages = []
    const changePage = () =>{

    }
    for (let page = 1; page <= total_pages; page++) {
       pages.push(<span className={`bg-white border-2 ${currentPage == page ? "bg-blue-700 text-white" : "bg-white text-purple-800"} mx-1 box-content p-2 cursor-pointer max-h-3`} onClick={() => setCurrentPage(page)} key={page}><a href="#"> { page }</a></span>)    

    }

  return (
   <div className="py-6">
    {pages}
   </div>
  );
};

export default Pagination;
