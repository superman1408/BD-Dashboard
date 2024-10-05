import { CREATE_CONTRACT } from "../constants/actionTypes";

import * as API from "../api/index";

export const createContractPost = (formData) => async (dispatch) => {
  try {
    const { data } = await API.createContract(formData);
    dispatch({ type: CREATE_CONTRACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
