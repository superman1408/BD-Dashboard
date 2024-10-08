import express from "express";

import upload from "../middleware/storage.js";

import { createContractPost } from "../controllers/contract.js";

const router = express.Router();

// router.post("/", createContractPost);

router.post("/", upload.array("pdf"), createContractPost);



export default router;
