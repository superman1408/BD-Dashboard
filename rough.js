// export const entryDetails = async (req, res) => {
//   const value = req.body;
//   const projectNumber = value.docNo;
//   if (!projectNumber) {
//     return res.status(400).json({ message: "Project number is required" });
//   }

//   const updatePost = await EntryOverview.findOne({ docNo: projectNumber });

//   if (!updatePost) {
//     return res
//       .status(400)
//       .json({ message: "No Such Posts Found in Database..!!!" });
//   }

//   const id = updatePost._id;
//   updatePost.date.push(value.date);
//   updatePost.activity1.push(value.activity1);
//   updatePost.activity2.push(value.activity2);
//   updatePost.activity3.push(value.activity3);
//   updatePost.activity4.push(value.activity4);
//   updatePost.maleLabour.push(value.maleLabour);
//   updatePost.femaleLabour.push(value.femaleLabour);
//   updatePost.mason.push(value.mason);
//   updatePost.uploadPictures1.push(value.uploadPictures1);
//   updatePost.uploadPictures2.push(value.uploadPictures2);
//   updatePost.uploadPictures3.push(value.uploadPictures3);
//   updatePost.uploadPictures4.push(value.uploadPictures4);
//   updatePost.uploadPictures5.push(value.uploadPictures5);
//   updatePost.submittedBy.push(value.submittedBy);

//   const updated = await EntryOverview.findByIdAndUpdate(id, updatePost, {
//     new: true,
//   });

//   res.json(updated);
// };

// export const getEntryDetails = async (req, res) => {
//   try {
//     const postMessage = await EntryOverview.find({});
//     res.status(200).json(postMessage);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };



// import fs from 'fs';
// import ContractPDFOverview from '../models/ContractPDFOverview'; // Adjust the import based on your project structure

// export const createPDFfiles = async (req, res) => {
//   try {
//     // Check if any files were uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No PDF files uploaded" });
//     }

//     const value = req.body;
//     const projectNumber = value.contactEmail; // Assuming you get contactEmail from the request body

//     const updatePost = await ContractPDFOverview.findOne({ contactEmail: projectNumber });

//     if (!updatePost) {
//       return res.status(400).json({ message: "No Such Posts Found in Database..!!!" });
//     }

//     const id = updatePost._id;

//     // Initialize an object to hold the PDF buffers
//     const pdfBuffers = {
//       GST: null,
//       PAN: null,
//       incorporationCertificate: null,
//       bankGurantee: null,
//       signedContractCopy: null,
//     };

//     // Map the uploaded files to the corresponding keys
//     req.files.forEach((file, index) => {
//       switch (index) {
//         case 0:
//           pdfBuffers.GST = fs.readFileSync(file.path);
//           break;
//         case 1:
//           pdfBuffers.PAN = fs.readFileSync(file.path);
//           break;
//         case 2:
//           pdfBuffers.incorporationCertificate = fs.readFileSync(file.path);
//           break;
//         case 3:
//           pdfBuffers.bankGurantee = fs.readFileSync(file.path);
//           break;
//         case 4:
//           pdfBuffers.signedContractCopy = fs.readFileSync(file.path);
//           break;
//         default:
//           break; // Ignore any additional files beyond the expected ones
//       }
//     });

//     // Create a new document with the uploaded PDF buffers
//     const newPaySlip = new ContractPDFOverview(pdfBuffers);

//     // Save the document to MongoDB
//     await newPaySlip.save();

//     // Delete the temporary files
//     req.files.forEach((file) => fs.unlinkSync(file.path));

//     res.status(200).json({ message: "Files uploaded and processed successfully" });
//   } catch (error) {
//     // Handle file deletion in case of an error
//     if (req.files) {
//       req.files.forEach((file) => {
//         try {
//           fs.unlinkSync(file.path);
//         } catch (unlinkError) {
//           console.error("Error deleting file:", unlinkError);
//         }
//       });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };


// export const createPDFfiles = async (req, res) => {
//     const value = req.body;
//     const projectNumber = value.contactEmail;
  
//     try {
//       // Check if any files were uploaded
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: "No PDF files uploaded" });
//       }
  
//       const updatePost = await ContractPDFOverview.findOne({
//         contactEmail: projectNumber,
//       });
  
//       if (!updatePost) {
//         return res
//           .status(400)
//           .json({ message: "No Such Posts Found in Database..!!!" });
//       }
  
//       const id = updatePost._id;
  
//       // Initialize an object to hold the PDF buffers
//       const pdfBuffers = {
//         GST: null,
//         PAN: null,
//         incorporationCertificate: null,
//         bankGurantee: null,
//         signedContractCopy: null,
//       };
  
//       // Map the uploaded files to the corresponding keys
//       req.files.forEach((file, index) => {
//         switch (index) {
//           case 0:
//             pdfBuffers.GST = fs.readFileSync(file.path);
//             break;
//           case 1:
//             pdfBuffers.PAN = fs.readFileSync(file.path);
//             break;
//           case 2:
//             pdfBuffers.incorporationCertificate = fs.readFileSync(file.path);
//             break;
//           case 3:
//             pdfBuffers.bankGurantee = fs.readFileSync(file.path);
//             break;
//           case 4:
//             pdfBuffers.signedContractCopy = fs.readFileSync(file.path);
//             break;
//           default:
//             break; // Ignore any additional files beyond the expected ones
//         }
//       });
  
//       // Update the document with the new PDF buffers
//       const updated = await ContractPDFOverview.findByIdAndUpdate(
//         id,
//         { ...pdfBuffers }, // Use the new PDF buffers to update
//         {
//           new: true, // Return the updated document
//         }
//       );
  
//       // Delete the temporary files
//       req.files.forEach((file) => fs.unlinkSync(file.path));
  
//       res
//         .status(200)
//         .json({ message: "Files uploaded and processed successfully", updated });
//     } catch (error) {
//       // Handle file deletion in case of an error
//       if (req.files) {
//         req.files.forEach((file) => {
//           try {
//             fs.unlinkSync(file.path);
//           } catch (unlinkError) {
//             console.error("Error deleting file:", unlinkError);
//           }
//         });
//       }
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   //
  