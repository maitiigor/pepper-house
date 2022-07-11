import { useEffect, useRef, useState } from "react";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { db, storage } from "../config/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useFetchAllMenuQuery,
  usePostMenuMutation,
  useUpdateMenuMutation,
} from "../features/menu/apiMenuSlice";
import { menuProps } from "../models/menu";
import { useFetchAllMenu } from "../hooks/useFetchAllMenu.hook";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import {
  useFetchAllMenuCategoryQuery,
  usePostMenuCategoryMutation,
} from "../features/menuCategorySlice";
import ValidationMessage, { IValidationProp } from "../layout/Error";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { toggleModal } from "../features/modalSlice";
import { closeError, showMessage } from "../features/validationErrorSlice";
import {
  setDescription,
  setMenuCategoryId,
  menuFormSlice,
  setId,
  setName,
  setPrice,
  resetForm,
} from "../features/menu/menuFormSlice";
import Select, { IOptions } from "../components/Select";

interface IMenuCategory {
  name: string;
}

const alertStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "40%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Menu() {

  const isModalOpen = useAppSelector((state) => state.modal.openModal);
  const dispatch = useAppDispatch();
  const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);
  const [isCategoryModalOpen, setisCategoryModalOpen] = useState(false);

  const categorySelected = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [menuCategory, setmenuCategory] = useState<IMenuCategory>({ name: "" });
  const name = useAppSelector((state) => state.menuForm.name);
  const description = useAppSelector((state) => state.menuForm.description);
  const price = useAppSelector((state) => state.menuForm.price);
  const menuId = useAppSelector((state) => state.menuForm.id);
  const menuCategoryId = useAppSelector(
    (state) => state.menuForm.menu_category_id
  );

  const [isSumitting, setisSumitting] = useState(false);
  // const [menuList, isLoading, isError] = useFetchAllMenu();

  interface IPostUpdate {
    id: string;
    body: FormData;
  }

  const MySwal = withReactContent(Swal);
  const {
    data: menus = [],
    isLoading,
  } = useFetchAllMenuQuery();
  const [categoryOptions, setcategoryOptions] = useState<Array<IOptions>>([]);
  const [selectedOption, setselectedOption] = useState<IOptions>({
    value: "",
    label: "",
  });
  const erorrResponder = (error : any) => {
    if (error.status == 422 && error.data.errors != null) {
      console.log("validation error");
      let message = Object.keys(error.data.errors)
        .map(function (key, index) {
          return error.data.errors[key];
        })
        .flat();
      dispatch(showMessage({ isSuccess: false, message: message }));
      setisSumitting(false);
    }
  }
  const {
    data: categories = [],
  } = useFetchAllMenuCategoryQuery();

  const [
    postMenu, // This is the mutation trigger
    { isLoading: isSubmited, isError: isSubmitedError, error: requestError }, // This is the destructured mutation result
  ] = usePostMenuMutation();

  const [
    postMenuCategory,
  ] = usePostMenuCategoryMutation();

  const [
    updateMenuRequest, // This is the mutation trigger
    { isLoading: isUpdating, isError: isUpdatingError, error: updatingRequest }, // This is the destructured mutation result
  ] = useUpdateMenuMutation();

  const menuList = menus;

  const showAlert = () => MySwal.fire(<p>Shorthand works too</p>);

  const editMenu = (id: string) => {
    const editMenu = menus.find((e) => {
      return e.id == id;
    });
    if (editMenu) {
      dispatch(setName(editMenu.name));
      dispatch(setDescription(editMenu.description));
      //dispatch(setMenuCategoryId(editMenu.menu_category_id))
      dispatch(setMenuCategoryId(editMenu.menu_category_id));
      dispatch(setId(editMenu.id))
      let cat = categoryOptions.find((el) => {
        return el.value == editMenu.menu_category_id;
      });
      console.log(cat);

      if (cat) {
        console.log("got cat ksksk");

        setselectedOption({ value: cat.value, label: cat.label });
      } else {
      }

      document.querySelector("#menu_category");
      console.log(categorySelected.current?.attributes);

      dispatch(setMenuCategoryId(editMenu.menu_category_id));
      dispatch(setPrice(editMenu.price));
    }

    dispatch(toggleModal());
  };

  function openModal() {
    const menu_cat: Array<IOptions> = [];
    categories.forEach((el) => {
      menu_cat.push({ label: el.name, value: el.id });
    });
    setcategoryOptions(menu_cat);
    setselectedOption({ value: "", label: "" });
    dispatch(setName(""));
    dispatch(setDescription(""));
    dispatch(setPrice(""));
    dispatch(setMenuCategoryId(""));
    dispatch(toggleModal());
    dispatch(closeError());
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

  const updateMenu = () => {
    setisSumitting(true);
    const file = inputUpdateAvatarPhoto.current?.files;

    let formData = new FormData();

    formData.append("name", name);
    if (file) {
      formData.append("image", file[0]);
    }
    formData.append("_method","PUT")
    formData.append("description", description);
    formData.append("price", price);
    formData.append('id',menuId)
    formData.append("menu_category_id", selectedOption.value);
    updateMenuRequest(formData)
      .unwrap()
      .then((payload) => {
        showMessage({ isSuccess: true, message: ["Menu Updated Successfully"] })
        setisSumitting(false);
      })
      .catch((error) => {
        erorrResponder(error)
      });

    //setIsAlertOpen(true);
  };

  const deleteMenu = (id: string) => {
    db.collection("menus").doc(id).delete();
  };

  const saveMenu = () => {
    setisSumitting(true);
    const file = inputUpdateAvatarPhoto.current?.files;

    let formData = new FormData();

    formData.append("name", name);
    if (file) {
      formData.append("image", file[0]);
    }
    formData.append("description", description);
    formData.append("price", price);
    formData.append("menu_category_id", selectedOption.value);

    postMenu(formData)
      .unwrap()
      .then((payload) => {
        console.log(payload);

        formRef.current?.reset();

        dispatch(
          showMessage({ isSuccess: true, message: ["Menu Added Successfully"] })
        );
        dispatch(resetForm());
        setisSumitting(false);
      })
      .catch((error) => {
        erorrResponder(error)
      });

    // formData.append("menu_category_id");

    /* if (file != null) {
      const storageRef = storage.ref("menus/").child(file[0].name);
      const uploadTask = storageRef.put(file[0]);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          alert(error);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setimgUrl(url);

          db.collection("menus").add({
            name: name,
            description: description,
            price: price,
            image_url: imgUrl,
            created_at: Date.now(),
            updated_at: Date.now(),
          });
          setIsOpen(false);
          setIsAlertOpen(true);
        }
      );
    } */
  };

  const saveMenuCategory = () => {
   

    let formData = new FormData();

    formData.append("name", menuCategory?.name);

    postMenuCategory(formData)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        erorrResponder(error)
      });
  };

  const submitMenu = () => {
    if (menuId == "") {
      saveMenu();
    } else {
      updateMenu();
    }
  };

  function closeModal() {
    dispatch(toggleModal());
    setisCategoryModalOpen(false);
  }
  return (
    <>
      {/*  <SideBar title='Menus'></SideBar> */}
      <div className="w-full overflow-auto h-screen">
        <div className="grid grid-cols-3 text-right">
          <div className="col-span-2"></div>

          <div>
            <button
              className="py-2 px-4 mr-2 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
              onClick={openModal}
            >
              Add Menu
            </button>

            <button
              className="py-2 px-3 mt-5 bg-red-600 rounded-lg text-white font-semibold hover:bg-green-600"
              onClick={() => setisCategoryModalOpen(true)}
            >
              Add Menu Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-left">
          <div className="col-span-3 gap-0 text-right"></div>
          {isLoading ? (
            <div
              className="flex flex-col justify-center items-center fixed top-1/2 left-1/3 right-72
            "
            >
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

          {!isLoading && menuList.length != 0
            ? menuList.map((el, k) => (
                <div className="rounded-lg shadow-xl bg-white " key={k}>
                  <div className="p-5">
                    {/*  <!--Card Header--> */}

                    <img
                      src={el.image_url}
                      alt=""
                      className="max-h-52 min-w-full max-w-full"
                    />

                    <div className="font-semibold text-lg pb-2">{el.name}</div>
                    <p className="text-gray-500">
                      <strong>Description : </strong>{" "}
                      {el.description.substring(0, 125)}{" "}
                      {el.description.length > 125 ? "..." : ""}
                      <br />
                      <strong>Price : </strong>
                      {el.price}
                    </p>
                    <div className="text-right space-x-2 align-bottom">
                      <button
                        className=" py-2 px-4 mt-5 border border-green-500 rounded-lg text-green-500 font-semibold hover:text-white hover:bg-green-600"
                        onClick={() => editMenu(el.id)}
                      >
                        EDIT
                      </button>
                      {/*  <button className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600">
                        VIEW
                      </button> */}
                      <button
                        className="py-2 px-4 mt-5 bg-red-600 rounded-lg text-white font-semibold hover:bg-yellow-600"
                        onClick={() => deleteMenu(el.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>

        {isModalOpen ? (
          <>
            <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-4 z-50 outline-none focus:outline-none">
              <div className="relative sm:w-full my-6 mx-auto pl-0 lg:pl-10 max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}

                  <div className="grid grid-cols-2  p-6">
                    <div>
                      <h3 className="text-3xl font-semibold">Add Menu</h3>
                    </div>
                    <div className="text-right ">
                      <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faClose} size="2x" />
                      </button>
                    </div>
                  </div>

                  {/*body*/}
                  <form className="w-full" ref={formRef}>
                    <div className="px-5">
                      <ValidationMessage />
                      <div className="md:flex md:items-center mb-6 pt-4">
                        <div className="w-1/5">
                          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                            Menu Name
                          </label>
                        </div>
                        <div className="md:w-full">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            value={name}
                            type="text"
                            onChange={(e) => dispatch(setName(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="w-1/5">
                          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                            Category
                          </label>
                        </div>
                        <div className="md:w-full">
                          {/* <select
                            name=""
                            id="menu_category"
                            ref={categorySelected}
                            onChange = {(e) => dispatch(setMenuCategoryId(e.currentTarget.value))}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500 menu_category"
                          >
                            <option value="">select menu category</option>
                            {categories.map((cat, key) => (
                              <option value={cat.id} key={key}>
                                {cat.name}
                              </option>
                            ))}
                          </select> */}
                          <Select
                            title="menu category"
                            selectedState={setselectedOption}
                            selected={selectedOption}
                            options={categoryOptions}
                          />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="w-1/5">
                          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                            Price
                          </label>
                        </div>
                        <div className="md:w-full">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            value={price}
                            type="number"
                            onChange={(e) => dispatch(setPrice(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="w-1/5">
                          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                            Menu image
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
                          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 ">
                            Description
                          </label>
                        </div>
                        <div className="md:w-full">
                          <textarea
                            name=""
                            value={description}
                            id=""
                            cols={20}
                            rows={8}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            onChange={(e) =>
                              dispatch(setDescription(e.target.value))
                            }
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
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-4 rounded"
                            type="button"
                            disabled={isSumitting}
                            onClick={submitMenu}
                          >
                            {isSumitting ? (
                              <div
                                className="inline-block animate-spin border-r-2 border-l-4 border-t-4  w-4 h-4 rounded-full text-white"
                                role="status"
                              ></div>
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => dispatch(toggleModal())}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => dispatch(toggleModal())}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
          ""
        )}

        <Modal
          isOpen={isCategoryModalOpen}
          onRequestClose={closeModal}
          style={alertStyles}
          className={"overflow-y-scroll h-screen"}
          preventScroll={false}
          contentLabel="Alert Modal"
        >
          <form className="w-full">
            <div className="px-5">
              <ValidationMessage />

              <div className="md:flex md:items-center mb-6">
                <div className="w-2/5">
                  <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                    Category Name
                  </label>
                </div>
                <div className="md:w-full">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                    value={menuCategory?.name}
                    type="text"
                    onChange={(e) => setmenuCategory({ name: e.target.value })}
                  />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-w-1/5"></div>
                <div className="md:w-full text-right">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-4 rounded"
                    type="button"
                    disabled={isSumitting}
                    onClick={saveMenuCategory}
                  >
                    {isSumitting ? (
                      <div
                        className="inline-block animate-spin border-r-2 border-l-4 border-t-4  w-4 h-4 rounded-full text-white"
                        role="status"
                      ></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Menu;
