import React, { FC, useEffect, useRef, useState } from "react";
import { faCaretSquareDown, faSquareCaretLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDropDownHandler} from './select-dropdown-hook'

type WithChildren<T = {}> = T & { children?: React.ReactNode };

export interface IOptions {
  label: string;
  value: string;
}
interface ISelect {
  options: Array<IOptions>
  selectedState: React.Dispatch<React.SetStateAction<IOptions>>
  selected: IOptions
  title: string
}


interface props {
  message: string;
  isSuccess: boolean;
  isVisibile: boolean;
  setisVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Select = ({ options, selected, selectedState, title }: ISelect) => {

 const [selectRef,openSelectOption,setOpenSelectOption] = useDropDownHandler()

 const [inputValue, setinputValue] = useState(selected?.label != undefined ? selected.label : "")
  
  const [selectedLabel, setselectedLabel] = useState(selected?.label != undefined ? selected.label : "")

  const [newOptions, setnewOptions] = useState<Array<IOptions>>(options)
  const inputFieldRef = useRef<HTMLInputElement>(null)

  const searchOptions = (searchTerm:string) =>{
    setOpenSelectOption(true);
    setinputValue(searchTerm)
   const filteredOption =  options.filter((item) => {
      return  item.label.toLowerCase().includes(searchTerm)
    })
    console.log(filteredOption)
    setnewOptions(filteredOption)
    setTimeout(() => {
      if((inputFieldRef.current?.value == '' ) && inputFieldRef.current != document.activeElement){
        console.log("ere "); 
        setinputValue(selected.label)
      }
    }, 3000);


  }

  const toggleDropDown = (e : React.MouseEvent) => {
    
    setOpenSelectOption(!openSelectOption);
    setnewOptions(options)
   
  }
 

  const [selectedValue, setselectedValue] = useState<string>(
    selected?.value ? selected.value : ""
  );
  const [placeholder, setplaceholder] = useState("select " + title.toLowerCase())

  
 // const placeholder = selectedValue === "" ? "select an option" : selectedValue;

  const changeSelectedValue = (item : IOptions) => {
    setselectedValue(item.value);
    setselectedLabel(item.label)
    setinputValue(item.label)
    selectedState(item)
    setOpenSelectOption(false)

  };

  return (
    <div className="md:w-full" ref={selectRef}>
      <br />
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-full-name"
        type="text"
        ref={inputFieldRef}
        value={inputValue}
        onChange={ (e) => searchOptions(e.target.value)}
        placeholder={placeholder}
      />
      <FontAwesomeIcon
        className={`-ml-6 mt-3 absolute`}
        icon={faCaretSquareDown}
        onClick={(e) => toggleDropDown(e)}
      />
      <div
        className={`${
          openSelectOption ? "visible" : "hidden"
        } bg-white absolute max-h-60 overflow-y-auto`}
        style={{ width: selectRef.current?.offsetWidth }}
      >
        <div className="border-2 cursor-pointer hover:border-current border-r-2" onClick={() => changeSelectedValue({label: placeholder, value: ""})}>
          <div className="pl-3 bg-white w-full"> {placeholder}</div>
        </div>
        {newOptions.map((item, key) => (
          <div key={key} className="border-2 cursor-pointer hover:border-current border-r-2" onClick={() => changeSelectedValue(item)}>
            <div className="pl-3 bg-white w-full">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
