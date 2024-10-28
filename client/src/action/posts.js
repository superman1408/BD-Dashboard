import {
  CREATE,
  FETCH_ALL,
  FETCH_POST,
  UPDATE_POST,
  UPDATE_ENTRY,
  GET_ENTRY,
} from "../constants/actionTypes";
import * as API from "../api/index";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
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

export const update = (id, formData) => async (dispatch) => {
  try {
    const { data } = await API.updatePost(id, formData);
    console.log("data", data);

    // const response = await api.put(`/posts/${postId}`, updatedData); // Update your API endpoint
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error(
        "Request was made but no response received:",
        error.request
      );
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
};

export const entryDetails = (formdata) => async (dispatch) => {
  try {
    const { data } = await API.entryDetails(formdata);

    dispatch({ type: UPDATE_ENTRY, payload: data });
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

// export const updateEntry = (id, indexed, toEdit) => async (dispatch) => {
//   try {
//     const { data } = await API.editTable(id, indexed, toEdit);
//     dispatch({ type: UPDATE_ENTRY, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
