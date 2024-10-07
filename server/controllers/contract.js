import ContractOverview from "../model/contractDetail.js";
import ContractPDFOverview from "../model/files.js";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "uploads/" }); // Specify the upload directory
// / ________________________create contract operation___________________________

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Change to your desired directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

export const createContractPost = async (req, res) => {
  const Data = req.body;

  const NewContractData = new ContractOverview(Data);

  try {
    await NewContractData.save();
    res.status(201).json(NewContractData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const createPDFfiles = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length < 5) {
      return res.status(400).json({ message: "Not all PDF files uploaded" });
    }

    // Assuming the order of files is known (GST, PAN, etc.)
    const [
      GST,
      PAN,
      incorporationCertificate,
      bankGurantee,
      signedContractCopy,
    ] = req.files;

    // Read the PDF files from disk
    const pdfBuffer1 = fs.readFileSync(GST.path);
    const pdfBuffer2 = fs.readFileSync(PAN.path);
    const pdfBuffer3 = fs.readFileSync(incorporationCertificate.path);
    const pdfBuffer4 = fs.readFileSync(bankGurantee.path);
    const pdfBuffer5 = fs.readFileSync(signedContractCopy.path);

    // Create a new document with the uploaded PDF buffers
    const newPaySlip = new ContractPDFOverview({
      GST: pdfBuffer1,
      PAN: pdfBuffer2,
      incorporationCertificate: pdfBuffer3,
      bankGurantee: pdfBuffer4,
      signedContractCopy: pdfBuffer5,
    });

    // Save the document to MongoDB
    await newPaySlip.save();

    // Delete the temporary files
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res
      .status(200)
      .json({ message: "All files uploaded and processed successfully" });
  } catch (error) {
    // Handle file deletion in case of an error
    if (req.files) {
      req.files.forEach((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};
