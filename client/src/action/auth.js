import { AUTH } from "../constants/actionTypes";

import * as API from "../api/index";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // signIn block
    const { data } = await API.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);

    // toast coding for error message
    toast.error("Invalid Credentials, Please try Again Later...!!", {
      position: "top-center",
    });
  }
};

export const signup = (formData, code, navigate) => async (dispatch) => {
  try {
    // signUp block
    const { data } = await API.signUp(formData, code);
    dispatch({ type: AUTH, data });
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);
    toast.error("Invalid Credentials, Please try Again Later...!!", {
      // position: toast.POSITION.TOP_CENTER,
      position: "top-center",
    });
  }
};

export const resetPassword =
  (passwordForm, code, navigate) => async (dispatch) => {
    console.log("I will try to reset your password..!!");

    try {
      const { data } = await API.passwordReset(passwordForm, code).then(() => {
        dispatch({ type: AUTH, data }).then(() => {
          navigate("/auth", { replace: true });
        });
      });
    } catch (error) {
      console.log("Error occure in action section in frontend : ", error);
    }
  };
