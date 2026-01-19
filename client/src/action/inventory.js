import * as API from "../api";
import {INVENTORY_LIST} from "../constants/actionTypes";


// ----------------------------For Creating -------------------------------
export const inventoryList = (formData, id) => async (dispatch) => {
  console.log("Hello I am working at InventoryList!!");

  try {
    const { data } = await API.inventoryList(formData, id);
    console.log("Inside");

    dispatch({ type: INVENTORY_LIST, payload: data });
    // return data.timesheetList;
  } catch (error) {
    console.log(error);
  }
};