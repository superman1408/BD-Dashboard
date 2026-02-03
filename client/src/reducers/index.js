import { combineReducers } from "redux";

import posts from "./posts";

import auth from "./auth";

import entry from "./entry";

import contract from "./contract";

import inventory from "./inventory";

export default combineReducers({ posts, auth, entry, contract, inventory });
