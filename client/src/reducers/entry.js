import { GET_ENTRY, UPDATE_ENTRY } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (entry = [], action) => {
  switch (action.type) {
    case UPDATE_ENTRY:
      return [...entry, action.payload];
    case GET_ENTRY:
      return action.payload;


      

    default:
      return entry;
  }
};

