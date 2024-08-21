import express from "express";

import { createPost, getPosts, entryDetails } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", auth, createPost);

router.post("/", auth, createPost);

router.post("/entryDetails", entryDetails);

export default router;
