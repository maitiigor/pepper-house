import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useFetchAllOrderQuery } from "../features/orders/apiOrderSlice";
import usefetchAllOrder from "../hooks/usefetchAllOrder.hook";


import Header from "../layout/Header";
import PendingOrder from "./PendingOrder";






function Order() {
  const [count, setCount] = useState(0);
  const [showIsPending, setshowIsPending] = useState<boolean>(true);
 
  //const [orderList, isLoading, isError] = usefetchAllOrder();
  const [currentpage, setcurrentpage] = useState(1)

  const {
    data: orders ,
    isLoading,
    isError
  } = useFetchAllOrderQuery(currentpage);

 

  
  console.log(orders);
  
  const handleTabClick = (id: boolean) => {
    setshowIsPending(id);
  };

  return (
    <>
     
     <div className="w-full">
        <div className="grid grid-cols-2 gap-2 pt-4">
          <a href="#" onClick={(e) => handleTabClick(true)}>
            <div className="bg-gray-100 text-center inline-block w-full rounded-t-lg h-15 p-5">
              <a className="mr-2 text-sm font-medium" href="#">
                Pending
              </a>
            </div>
          </a>

          <a href="#" onClick={(e) => handleTabClick(false)}>
            <div className="bg-gray-100 text-center inline-block w-full rounded-t-lg h-15 p-5">
              <a className="mr-2 text-sm font-medium" href="#">
                Fufilled
              </a>
            </div>
          </a>
        </div>
        {
        showIsPending ? <PendingOrder orders={orders?.data} isLoading = {isLoading} isError={isError} /> 
        : ""}
        {showIsPending ? <Pagination currentPage={currentpage} setCurrentPage={setcurrentpage} total_pages={orders?.total_pages ? parseInt(orders.total_pages) : 0}/> : ""}
      </div>
     
    </>
  );
}

export default Order;
