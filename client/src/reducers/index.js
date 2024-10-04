import { combineReducers } from "redux";

import posts from "./posts";

import auth from "./auth";

import entry from './entry';

export default combineReducers({ posts, auth, entry });
