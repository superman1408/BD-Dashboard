import { CREATE, FETCH_ALL, FETCH_POST } from "../constants/actionTypes";
import * as API from "../api/index";

export const getPosts = () => async (dispatch) => {
  try {
    const {data}  = await API.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });

    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = API.create(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = API.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


