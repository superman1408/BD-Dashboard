import {INVENTORY_LIST} from "../constants/actionTypes";

export default (inventoryData = [], action) => {
  switch (action.type) {
    case INVENTORY_LIST :
      return [...inventoryData , action.payload];


    default:
      return inventoryData;
  }
};

    