import {
  FETCH_ALL,
  CREATE,
  FETCH_POST,
  UPDATE_POST,
  UPDATE_ENTRY,
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

    case UPDATE_POST:
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    // return state.map((post) =>
    //   post.projectNumber === action.payload.projectNumber
    //     ? { ...post, ...action.payload }
    //     : post
    // );
    default:
      return posts;
  }
};
