import { combineReducers } from "redux";

import posts from "./posts";

import auth from "./auth";

import entry from "./entry";

import contract from "./contract";

export default combineReducers({ posts, auth, entry, contract });
