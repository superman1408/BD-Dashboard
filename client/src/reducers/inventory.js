import {INVENTORY_LIST} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (inventoryData = [], action) => {
  switch (action.type) {
    case INVENTORY_LIST :
      return [...inventoryData , action.payload];


    default:
      return inventoryData;
  }
};

    