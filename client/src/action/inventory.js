import * as API from "../api";
import { INVENTORY_LIST, GET_INVENTORY } from "../constants/actionTypes";

// ----------------------------For Creating -------------------------------
// export const inventoryList = (formData, id) => async (dispatch) => {
//   console.log("Hello I am working at InventoryList!!");

//   try {
//     const { data } = await API.inventoryList(formData, id);
//     console.log("Inside");

//     dispatch({ type: INVENTORY_LIST, payload: data });
//     // return data.timesheetList;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const inventoryList = (formData, id) => async (dispatch) => {
//   try {
//     console.log("Thunk called");

//     const { data } = await API.inventoryList(formData, id);
//     console.log(data);

//     dispatch({ type: INVENTORY_LIST, payload: data });
//   } catch (error) {
//     console.log(
//       "Inventory API Error:",
//       error.response?.data || error.message
//     );
//   }
// };

export const inventoryList = (newActivity, id) => async (dispatch) => {
  try {
    console.log(newActivity);

    const { data } = await API.inventoryList(newActivity, id);

    dispatch({ type: INVENTORY_LIST, payload: data });

    return data; // ✅ THIS makes await work
  } catch (error) {
    console.log("Inventory API Error:", error.response?.data || error.message);
    throw error; // ✅ important
  }
};

export const getInventoryDetails = () => async (dispatch) => {
  try {
    const { data } = await API.fetchInventoryDetails();

    dispatch({ type: GET_INVENTORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
