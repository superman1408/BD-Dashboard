import { CREATE_CONTRACT, CONTRACT_PDF } from "../constants/actionTypes";

import * as API from "../api/index";

// export const createContractPost = (formData) => async (dispatch) => {
//   try {
//     const { data } = await API.createContract(formData);
//     dispatch({ type: CREATE_CONTRACT, payload: data });
//   } catch (error) {
//     console.log(error);
//     if (error.response && error.response.status === 409) {
//       console.error("Conflict error:", error.response.data.message);
//       alert("Conflict error: " + error.response.data.message);
//     } else {
//       console.error("Error:", error);
//       alert("An error occurred: " + error.message);
//     }
//   }
// };

export const createContractPost = (formData) => async (dispatch) => {
  console.log("Here  is the form data", formData);

  try {
    const { data } = await API.createContract(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: CONTRACT_PDF, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//
