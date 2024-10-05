import express from "express";

import { createContractPost } from "../controllers/contract.js";

const router = express.Router();

router.post("/", createContractPost);

export default router;
