import {
  CREATE,
  FETCH_ALL,
  FETCH_POST,
  UPDATE,
  GET_ENTRY,
  UPDATE_ENTRY,
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
    const { data } = await API.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

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
    dispatch({ type: GET_ENTRY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateEntry = (id, indexed, toEdit) => async (dispatch) => {
  try {
    const { data } = await API.editTable(id, indexed, toEdit);
    dispatch({ type: UPDATE_ENTRY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// action/posts.js

// export const updateEntry = (entry) => async (dispatch) => {
//   // Make your API call to update the entry
//   const response = await api.updateEntry(entry);
//   dispatch({ type: "UPDATE_ENTRY", payload: response.data });
// };

// export const getSalarySlipData = () => async (dispatch) => {
//   try {
//     const { data } = await API.fetchSalarySlipData();

//     dispatch({ type: SALARY_ALL, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
