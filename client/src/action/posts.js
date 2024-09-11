import {
  CREATE,
  FETCH_ALL,
  FETCH_POST,
  UPDATE,
} from "../constants/actionTypes";
import * as API from "../api/index";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPosts();
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

// export const entryDetails = (post) => async (dispatch) => {
//   try {
//     const { data } = API.create(post);
//     dispatch({ type: CREATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const entryDetails = (formdata) => async (dispatch) => {
  console.log("Hello I am working..!!");
  // console.log(id);
  // console.log(state);

  try {
    const { data } = await API.entryDetails(formdata);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getEntryDetails = () => async (dispatch) => {
  try {
    const { data } = await API.fetchEntryDetails();
    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const getSalarySlipData = () => async (dispatch) => {
//   try {
//     const { data } = await API.fetchSalarySlipData();

//     dispatch({ type: SALARY_ALL, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
