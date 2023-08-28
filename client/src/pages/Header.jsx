import React, { useState } from "react";
import Popup from "../components/Popup";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync, signinAsync, clearError ,signoutAsync } from "../features/auth/user.slice";
export default function Header(props) {
  const navigate = useNavigate();
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const { user, error, loading,success } = useSelector((state) => state.auth);
  // const [signOutPopup, setsignOutPopup] = useState(false);

  let AuthSchema = yup.object({
    userName: yup.string().trim().required("username is required"),
    password: yup.string().trim().required("password is required"),
  });

  const {
    values: LoginValue,
    handleSubmit: LoginSubmit,
    handleChange: LoginChange,
    errors: LoginError,
    touched: LoginTouched,
    resetForm:LoginReset
  } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: AuthSchema,

    onSubmit: async (values) => {
      dispatch(clearError())
     dispatch(signinAsync(values))
    },
  });




  const {
    values: SignUpValue,
    handleSubmit: SignUpSubmit,
    handleChange: SignUpChange,
    errors: SignUpError,
    touched: SignUpTouched,
    resetForm:SignupReset
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: AuthSchema,

    onSubmit: async (values) => {
      dispatch(clearError())
      dispatch(signupAsync(values))
    },
  });

  const signinpopup = () => {
    LoginReset()
    dispatch(clearError())
    setSignin((prev)=>!prev);
  };
  const signuppopup = () => {
    SignupReset()
    dispatch(clearError())
    setSignup((prev)=>!prev);
  };
  
  const signout = ()=>{
    dispatch(signoutAsync());
    navigate("/")
  }
  return (
    <div className="bg-gray-100">
    <div className="navbar container mx-auto flex items-center justify-between">
      <div className="navbar-start">
        <Link to="/" className="normal-case text-xl h-20 w-36">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/004/908/013/small/coding-logo-design-template-free-vector.jpg" alt="logo" className="h-full w-full mix-blend-darken" />
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex items-center">
        {user ? (
          <>
          <h4 className="hidden sm:flex">{user && user.userName}</h4>
          <button className="btn btn-accent btn-active ml-2 text-white hidden sm:flex" onClick={signout}>
            SIGN OUT
          </button>
          <div className="flex sm:hidden dropdown relative">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              {/* Dropdown content */}
              <ul className="menu menu-sm dropdown-content mt-3  z-[1] p-2 shadow bg-base-100 w- absolute right-0">
                <li > <button className="line-clamp-1 w-36 ">{user && user.userName} </button></li>
                <li> <button className="btn btn-ghost" onClick={signout}>
            SIGN OUT
          </button></li>
              </ul>
            </div>

          </>
        ) : (
          <>
            <div className="hidden sm:flex gap-5">
              <button
               className="btn btn-accent btn-active text-white" role="button" aria-pressed="true"
                onClick={signinpopup}
              >
                SIGN IN
              </button>
              <button  className="btn btn-accent btn-active " role="button" aria-pressed="true">
                <div className="indicator text-white" onClick={signuppopup}>
                  SIGN UP
                </div>
              </button>
            </div>

            <div className="flex sm:hidden dropdown relative">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              {/* Dropdown content */}
              <ul className="menu menu-sm dropdown-content mt-3  z-[1] p-2 shadow bg-base-100 w-32 absolute right-0">
                <li > <button onClick={signinpopup}>SIGN IN </button></li>
                <li>  <button onClick={signuppopup}>SIGN UP</button></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>

    {signin && <Popup title={"signin"} openPopup={signinpopup} value={LoginValue} change={LoginChange} Error={LoginError} loading={loading} success={success}  apierror={error}  Submit={LoginSubmit} Touched={LoginTouched}/>}
    {signup && <Popup title={"signup"} openPopup={signuppopup} value={SignUpValue} change={SignUpChange} Error={SignUpError} loading={ loading} success={success} apierror={error} Submit={SignUpSubmit} Touched={SignUpTouched}/>}
  </div>
  );
}
