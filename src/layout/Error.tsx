import { FC, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAppDispatch,useAppSelector} from '../app/hook'
import {closeError} from '../features/validationErrorSlice'


type WithChildren<T = {}> = 
  T & { children?: React.ReactNode };

  interface props {
    message: string
    isSuccess: boolean
    isVisibile: boolean
    setisVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
export interface IValidationProp {
  message: Array<string>
  isSuccess: boolean
}
type IValidationMessage = WithChildren<{
 
}>;

function ValidationMessage({children }: IValidationMessage) {
 
  const isVisibile = useAppSelector((state) => state.validationError.isVisibile)
  const isSuccess = useAppSelector((state) => state.validationError.isSuccess)
  const message = useAppSelector((state) => state.validationError.message)
  const dispatch = useAppDispatch()

  return (
    <>
      <div className={`grid ${isSuccess ? "bg-green-600" : "bg-red-600"} grid-cols-1 text-white px-2 hid ${isVisibile ? "visible" : "hidden"}`}>
        <div className="text-right">
            {children}
            <a href="#" onClick={ () => dispatch(closeError())}>
                  <FontAwesomeIcon
                    icon={faClose}
                    color="white"
                  ></FontAwesomeIcon>
                </a>
        </div>
        <div className="text-left p-4">
          {message.map((el,k) =>(
            <div key={k}>
               {el}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ValidationMessage;
