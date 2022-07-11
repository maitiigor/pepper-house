import { FC, useEffect, useState } from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orderProps } from "../models/order";
import Modal from "react-modal";
import usefetchAllUser from "../hooks/useFetchAllUserHook";
import { userProps } from "../models/user";
import { IOrder } from "../features/orders/apiOrderSlice";

type orderlistProps = {
  orders?: IOrder[],
  isLoading : boolean,
  isError : boolean 
};

const PendingOrder: FC<orderlistProps> = ({ orders, isLoading,}: orderlistProps) => {
 /*  const pendingOrderFilter = orders.filter((el) => {
    return el.is_fufilled == false;
  }); */
  //const [orderList, setorderList] = useState(orders);
  const [orderDetails, setorderDetails] = useState<orderProps>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [orderData, setorderData] = useState<Array<IOrder>>(orders ? orders : []);
  console.log(orders);
  

  useEffect(() => {
  setorderData(orders ? orders : [])
  
    
  }, [orders])
  

 /*  const showOrderModal = (id: string) => {
    const singleOrder = orders.find((el) => {
      return el.id == id;
    });
    setorderDetails(singleOrder);
    setIsAlertOpen(true);
  };
 */
  const searchField = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    if(e.target.value == ""){
      setorderData(orders ? orders : [])

    }else{
      const search = orders?.filter(order => {
        return order.id.includes(e.target.value) || order.user.email.toLowerCase().includes(e.target.value) || order.user.first_name.toLowerCase().includes(e.target.value) || order.total_amount.includes(e.target.value)  || order.payment_reference.toLowerCase().includes(e.target.value.toLowerCase()) 
      });
      setorderData(search ? search : [])
    }
  
    
  }
/* 
  const getUserFullname = (user_id : string) : string => {
  
    
   const user = userList.find((el) => {
        return el.id == user_id
    });
    
    return user!.full_name;
  } */
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setIsAlertOpen(false);
  }
  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "45%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
    <div className="flex justify-end pr-4 pt-2">
       <label className="py-2 px-4 text-lg text-red-500 font-bold" htmlFor="">Search</label><input type="text" className="h-10 rounded-md border-2 px-2 shadow-md border-gray-400 focus:border-red-500" onChange={ (e) => searchField(e) } />
    </div>
    <div className="flex justify-end pr-4 pt-2 overflow-x-">
    <table className="w-full border border-t-2 border-collapse border-slate-500 mt-3 shadow-lg table-striped bg-white text-center">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-center">S/N</th>
            <th className="bg-blue-100 border text-center px-2 py-2">User Name</th>
            <th className="bg-blue-100 border ext-center px-2 py-2">Email</th>
            <th className="bg-blue-100 border text-left px-2 py-2">
              Total Amount
            </th>
            <th className="bg-blue-100 border text-center px-2 py-2">
              Payment Reference
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Ordered At
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
        {
          isLoading   ? <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/3 right-72
          ">
            <div
              className="spinner-border animate-spin inline-block w-24 h-24 border-8 rounded-full text-white border-yellow-400"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
    
            </div>
          </div> : ""
        }
        { !isLoading && orderData.length > 0 ? orderData.map((el, i) => (
            <tr key={el.id}>
              <td className="border px-2 py-2">{i + 1}</td>
              <td className="border px-2 py-2">{el.user.first_name}</td>
              <td className="border px-2 py-2">{el.user.email}</td>
              <td className="border px-2 py-2">{el.total_amount}</td>
              <td className="border px-2 py-2">{el.payment_reference}</td>
              <td className="border px-2 py-2">
                {el.created_at}
              </td>
              <td className="border px-2 py-2">
                {" "}
                <a href="#" /* onClick={() => showOrderModal(el.id)} */>
                  {" "}
                  <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>{" "}
                </a>{" "}
                {"   "}{" "}
                <a href="#" className="ml-2">
                  {" "}
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </a>
              </td>
            </tr>
          )): (
            <tr className="text-center">
              <td colSpan={7}>No record found</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
    
      <Modal
        isOpen={isAlertOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Alert Modal"
      >
        <div className="flex flex-col">
          {
            <div className="px-4">
              <p className="text-center font-bold text-lg">Order Details</p>
              <div className="py-2">
                <b>Order Id:</b> {orderDetails?.id}
              </div>
              <div className="py-2">
                <b>User name:</b> {orderDetails?.user_id.full_name}
              </div>
              <div className="py-2">
                <b>Order at : </b>
                {orderDetails?.created_at.toDate().toDateString() +" "+ orderDetails?.created_at.toDate().toTimeString()}
              </div>
              <div className="py-2">
                <b>Payment Refrence:</b> {orderDetails?.payment_reference}
              </div>
              <div className="py-2">
                <b>Description : </b>
                {orderDetails?.order_details.map((el) => (
                  <>
                    {el.menu_name +
                      " " +
                      el.price +
                      " x " +
                      el.quantity +
                      " = " +
                      el.total_amount}
                    <br></br>
                  </>
                ))}
              </div>
              <div className="py-2">
                <b>Total Amount : </b> {orderDetails?.total_amount}
              </div>
            </div>
          }
        </div>
      </Modal>
    </>
  );
};

export default PendingOrder;
