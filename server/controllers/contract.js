import ContractOverview from "../model/contractDetail.js";
import ContractPDFOverview from "../model/files.js";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs-extra";

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

// export const createContractPost = async (req, res) => {
//   const Data = req.body;

//   const NewContractData = new ContractOverview(Data);

//   try {
//     await NewContractData.save();
//     res.status(201).json(NewContractData);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };
export const createContractPost = async (req, res) => {
  const {
    contactEmail,
    contractorName,
    contactPerson,
    contactNumber,
    contractAddress,
    contractBillingAddress,
    contractStartDate,
    contractEndDate,
    bankGuranteeStartDate,
    bankGuranteeEndDate,
    contractValue,
    contractCurrency,
    GSTNo,
    PANNo,
    incorporationCertificateNo,
    bankGuaranteeNo,
  } = req.body;

  try {
    // Initialize an object to hold the PDF buffers
    const pdfBuffers = {
      contactEmail,
      contractorName,
      contactPerson,
      contactNumber,
      contractAddress,
      contractBillingAddress,
      contractStartDate,
      contractEndDate,
      bankGuranteeStartDate,
      bankGuranteeEndDate,
      contractValue,
      contractCurrency,
      GSTNo,
      PANNo,
      incorporationCertificateNo,
      bankGuaranteeNo,
      GST: null,
      PAN: null,
      incorporationCertificate: null,
      bankGurantee: null,
      signedContractCopy: null,
    };

    // Map the uploaded files to the corresponding keys
    for (const [fieldname, files] of Object.entries(req.files)) {
      files.forEach((file) => {
        switch (fieldname) {
          case "gstPdf":
            pdfBuffers.GST = fs.readFileSync(file.path);
            break;
          case "panPdf":
            pdfBuffers.PAN = fs.readFileSync(file.path);
            break;
          case "incorporationPdf":
            pdfBuffers.incorporationCertificate = fs.readFileSync(file.path);
            break;
          case "bankGuaranteePdf":
            pdfBuffers.bankGurantee = fs.readFileSync(file.path);
            break;
          case "signedContractPdf":
            pdfBuffers.signedContractCopy = fs.readFileSync(file.path);
            break;
          default:
            break; // Ignore any additional files beyond the expected ones
        }
      });
    }

    // Create a new document with the uploaded PDF buffers
    const newPaySlip = new ContractOverview(pdfBuffers);

    // Save the document to MongoDB
    await newPaySlip.save();

    // Delete the temporary files
    for (const [fieldname, files] of Object.entries(req.files)) {
      files.forEach((file) => fs.unlinkSync(file.path));
    }

    res
      .status(200)
      .json({ message: "Files uploaded and processed successfully" });
    // .then(async () => {
    //   try {
    //     await fs.remove("../uploads"); // Removes the uploads directory
    //     console.log("Uploads directory removed successfully");
    //   } catch (error) {
    //     console.error("Error removing uploads directory:", error);
    //   }
    // })
    // .catch((error) => {
    //   console.error("Error saving payslip:", error);
    // });
  } catch (error) {
    // Handle file deletion in case of an error
    if (req.files) {
      for (const [fieldname, files] of Object.entries(req.files)) {
        files.forEach((file) => {
          try {
            fs.unlinkSync(file.path);
          } catch (unlinkError) {
            console.error("Error deleting file:", unlinkError);
          }
        });
      }
    }
    res.status(500).json({ message: error.message });
  }
};



export const getContractDetails = async (req, res) => {

  try {
    const contract = await ContractOverview.find({});

    res.status(200).json(contract);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
