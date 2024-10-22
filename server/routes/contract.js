import express from "express";

import upload from "../middleware/storage.js";

import {
  createContractPost,
  getContractDetails,
} from "../controllers/contract.js";

const router = express.Router();

// router.post("/", createContractPost);

router.post(
  "/",
  upload.fields([
    { name: "gstPdf", maxCount: 1 },
    { name: "panPdf", maxCount: 1 },
    { name: "incorporationPdf", maxCount: 1 },
    { name: "bankGuaranteePdf", maxCount: 1 },
    { name: "signedContractPdf", maxCount: 1 },
  ]),
  createContractPost
);

router.get("/contractDetails/view", getContractDetails);

export default router;
