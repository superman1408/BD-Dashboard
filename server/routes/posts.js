import express from "express";

import {
  createPost,
  getPosts,
  getPost,
  entryDetails,
  getEntryDetails,
  update,
  // createContractPost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);

router.get("/:id", auth, getPost);

router.post("/", auth, createPost);

// router.post("/", auth, createPost);

router.patch("/:id/dashboard", auth, update);

router.patch("/entryDetails", auth, entryDetails);

router.get("/entryDetails/view", auth, getEntryDetails);

export default router;
