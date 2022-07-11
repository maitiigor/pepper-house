import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidationMessage from "../layout/Error";
import {useLoginMutation,ILogin} from '../features/authentication/apiLoginSlice';
import {showMessage} from '../features/validationErrorSlice'
import {useAppDispatch,useAppSelector} from '../app/hook'

function Login() {
 
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationMsg, setValidationMsg] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();
  const isLoginrRequestSuccess = useAppSelector((state) => state.validationError.isSuccess)
  const isShowValidationMessage = useAppSelector((state) => state.validationError.isVisibile)
  const validationMessage = useAppSelector((state) => state.validationError.message);
  const [isSuccess, setisSuccess] = useState<boolean>(false);
  const [isVisible, setisVisible] = useState(true); 
  const navigate = useNavigate();
  const [logining, setLogining] = useState<boolean>(false);
  const [visibility, setvisibility] = useState(true);
  const device_name = navigator.userAgent
  
  const [
    login, // This is the mutation trigger
    { isLoading: isUpdating, isError: isUpdatedError, error: requestError}, // This is the destructured mutation result
  ] = useLoginMutation()

   const closeDiv = () => {
    setisVisible(false)
  }; 
  const signWithEmailAndPassword = () => {
    setLogining(true);
   
      //login({email,password})

      let formData = new FormData();
      formData.append("email",email)
      formData.append("password", password)
      formData.append("device_name", device_name)
      console.log(email);
      console.log(formData.has("email"));
      
      login(formData).unwrap()
      .then((payload) => {
        setLogining(false);
        console.log(payload.token)
        sessionStorage.setItem('Auth Token', payload.token)
        dispatch(showMessage({isSuccess: true,message: ['Login successful redirecting to dashboard']}));
        setisVisible(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        
      })
      .catch((error) =>{
        setLogining(false);
        if(error.status == 422 && error.data.errors != null){


         let message = Object.keys( error.data.errors).map(function (key, index) {
            return  error.data.errors[key]
        }).flat();
          dispatch(showMessage({isSuccess: false, message: message}));
        }
      })
  
     
  
  }
     /*  auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          sessionStorage.setItem('Auth Token', result.user!.refreshToken)
          setisSuccess(true);
          console.log(result);
          setValidationMsg("");
          setisVisible(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((error) => {
          if ((error.code == "auth/wrong-password")) {
            setisSuccess(false);
            setisVisible(true);
            setValidationMsg("invalid email or password");
          }
          if(error.code == 'auth/too-many-requests'){

            setisSuccess(false);
            setisVisible(true);
            setValidationMsg("Too many request has been made. please try again later or reset your passsword");
          }
          if(error.code == 'auth/user-disabled'){

            setisSuccess(false);
            setisVisible(true);
            setValidationMsg("This user account has been disabled. Kindly contact the site administrator.");
          }


        });
    }
    setLogining(false); */
  

  return (
    <div className="w-screen">
    <div className=" flex flex-col w-1/2 h-screen fixed justify-center left-1/3 ">
      <div className="rounded-lg min-h-1/3 w-2/3 shadow-xl bg-white ">
        <form>
          <div className="p-8">
          
              <ValidationMessage/>
            
           
            <p className="text-center pb-6 text-xl font-semibold">Login</p>
            <div className="md:flex md:items-center mb-6">
              <div className="w-2/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                  Email
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="email"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-1">
              <div className="w-2/5">
                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0">
                  Password
                </label>
              </div>
              <div className="md:w-full">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500"
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-1">
              <div className="w-2/5"></div>
              <div className="md:w-full text-right">
                <span className="text-sm text-blue-800 font-medium">
                  <a href="">Register</a>
                </span>
                &nbsp;
                <span className="text-sm text-gray-700 font-medium ">
                  <a href="#">Forgot password</a>
                </span>
              </div>
            </div>

            <div className="md:flex">
              <div className="md:w-w-1/5"></div>
              <div className="md:w-full text-right">
                <br></br>
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-4 rounded"
                  type="button"
                  disabled={logining}
                  onClick={signWithEmailAndPassword}
                >
                  {logining ? (
                    <div
                      className="inline-block animate-spin border-r-2 border-l-4 border-t-4  w-4 h-4 rounded-full text-white"
                      role="status"
                    ></div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login
