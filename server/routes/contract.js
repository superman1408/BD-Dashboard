import express from "express";

import upload from "../middleware/storage.js";

import { createContractPost, createPDFfiles } from "../controllers/contract.js";

const router = express.Router();

router.post("/", createContractPost);

router.post("/pdffiles", upload.array("pdf"), createPDFfiles);

// router.post(
//   "/pdffiles",
//   upload.fields([
//     { name: "GST[]", maxCount: 1 },
//     { name: "PAN[]", maxCount: 1 },
//     { name: "incorporationCertificate[]", maxCount: 1 },
//     { name: "bankGurantee[]", maxCount: 1 },
//     { name: "signedContractCopy[]", maxCount: 1 },
//   ]),
//   createPDFfiles
// );

// router.post("/pdfSlipData", upload.single("pdf"), contractPDFPost);

export default router;
