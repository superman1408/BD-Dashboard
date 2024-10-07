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
    // Check if any files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No PDF files uploaded" });
    }

    // Initialize an object to hold the PDF buffers
    const pdfBuffers = {
      GST: null,
      PAN: null,
      incorporationCertificate: null,
      bankGurantee: null,
      signedContractCopy: null,
    };

    // Map the uploaded files to the corresponding keys
    req.files.forEach((file, index) => {
      switch (index) {
        case 0:
          pdfBuffers.GST = fs.readFileSync(file.path);
          break;
        case 1:
          pdfBuffers.PAN = fs.readFileSync(file.path);
          break;
        case 2:
          pdfBuffers.incorporationCertificate = fs.readFileSync(file.path);
          break;
        case 3:
          pdfBuffers.bankGurantee = fs.readFileSync(file.path);
          break;
        case 4:
          pdfBuffers.signedContractCopy = fs.readFileSync(file.path);
          break;
        default:
          break; // Ignore any additional files beyond the expected ones
      }
    });

    // Create a new document with the uploaded PDF buffers
    const newPaySlip = new ContractPDFOverview(pdfBuffers);

    // Save the document to MongoDB
    await newPaySlip.save();

    // Delete the temporary files
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res
      .status(200)
      .json({ message: "Files uploaded and processed successfully" });
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
