import express from "express";

import {
  createPost,
  getPosts,
  entryDetails,
  getEntryDetails,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", auth, createPost);

router.post("/", auth, createPost);

router.patch("/entryDetails",auth, entryDetails);

router.get("/entryDetails/view", getEntryDetails);

export default router;
