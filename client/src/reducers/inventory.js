import { INVENTORY_LIST, GET_INVENTORY } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (inventoryData = [], action) => {
  switch (action.type) {
    case INVENTORY_LIST:
      return [...inventoryData, action.payload];

    case GET_INVENTORY:
      return action.payload;

    default:
      return inventoryData;
  }
};
