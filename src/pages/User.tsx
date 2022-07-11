import { useRef, useState } from 'react'
import { faUtensils, faClose, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../layout/Header";
import Modal from "react-modal";
import SideBar from '../layout/AppLayOut';
import usefetchAllMenu from '../hooks/useFetchAllUserHook';
import {useFetchUsersQuery} from '../features/userSlice'
import { useFetchAllUserQuery } from '../features/users/apiUserSlice';

function User() {
  const [count, setCount] = useState(0);
  let subtitle;
  const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  //const [userList, isLoading, isError] = usefetchAllMenu();
  
  const {
    data: users ,
    isLoading,
    isError
  } = useFetchAllUserQuery(1);
  

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
  function openModal() {
    setIsOpen(true);
  }
  const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const files = inputUpdateAvatarPhoto.current?.files;
    // make sure that it's not null or undefined
    if (files) {
      const formData = new FormData();
      formData.append("avatar", files[0]);
    }
    // need to set something
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
    
      <div className="grid grid-cols-3 gap-2 text-left">
        <div className="col-span-3 gap-0 text-right">
          <button
            className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
            onClick={openModal}
          >
            Add User
          </button>
        </div>
      </div>
      {isLoading ? (
            <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/3 right-72
            ">
              <div
                className="spinner-border animate-spin inline-block w-24 h-24 border-8 rounded-full text-white border-yellow-400"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
      
              </div>
            </div>
          ) : (
            ""
          )}

      <table className=" w-full border border-t-2 border-collapse border-slate-500 mt-3 shadow-lg table-striped bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">S/N</th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              full_Name
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              email
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              address
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              phone_number
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              created_at
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              updated_at
            </th>
            <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
          </tr>
        </thead>

        { !isLoading && users?.data.length != 0 ? (
          users?.data.map((el, i) => (
            <tr>
              <td className="border px-8 py-4">{i + 1}</td>
              <td className="border px-8 py-4">{el.first_name + el.last_name}</td>
              <td className="border px-8 py-4">{el.email}</td>
              <td className="border px-8 py-4">{el.address}</td>
              <td className="border px-8 py-4">{el.phone_number}</td>
              <td className="border px-8 py-4">
            
              </td>
              <td className="border px-8 py-4">
               
              </td>
              <td className="border px-8 py-4">
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
          ))
        ) : ""}
      </table>
      

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {" "}
        <div className="text-right pr-5">
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} size="2x" />
          </button>
        </div>
        <div className="text-left pl-5">Menu</div>
        <form className="w-full">
          <div className="px-5">
            <div className="md:flex md:items-center mb-6">
              <div className="w-1/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                 Full name
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="w-1/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                 Phone Number
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="w-1/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                  Gender
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="w-1/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                  Image
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="menu_image"
                  accept="image/*"
                  type="file"
                  ref={inputUpdateAvatarPhoto}
                  onInput={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-start mb-6">
              <div className="md:w-1/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                  Address
                </label>
              </div>
              <div className="md:w-full">
                <textarea
                  name=""
                  id=""
                  cols={20}
                  rows={8}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                ></textarea>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5"></div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-w-1/5"></div>
              <div className="md:w-full text-right">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default User