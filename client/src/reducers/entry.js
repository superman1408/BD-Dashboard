import {
  GET_ENTRY
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (entry = [], action) => {
  switch (action.type) {
    case GET_ENTRY:
      return action.payload;

    default:
      return entry;
  }
};
