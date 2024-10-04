import {
  FETCH_ALL,
  CREATE,
  FETCH_POST,
  UPDATE,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_POST:
      return [...posts, action.payload];

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      return [...posts, action.payload];

    // case GET_ENTRY:
    //   return [...posts, action.payload];
    // case UPDATE_ENTRY:
    //   return [...posts, action.payload];

    default:
      return posts;
  }
};
