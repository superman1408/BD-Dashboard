import { AUTH, LOGOUT } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (authReducer = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...authReducer, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      console.log("localStorage after LOGOUT: ", localStorage.getItem("profile")); // Confirm clearing
      return { ...authReducer, authData: null };

    default:
      return authReducer;
  }
};

