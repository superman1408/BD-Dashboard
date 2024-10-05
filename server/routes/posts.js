import express from "express";

import {
  createPost,
  getPosts,
  getPost,
  entryDetails,
  getEntryDetails,
  // createContractPost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.post("/", auth, createPost);

router.patch("/entryDetails", auth, entryDetails);

router.get("/entryDetails/view", getEntryDetails);

export default router;
