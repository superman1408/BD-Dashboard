import multer from "multer";
// const upload = multer({ dest: "uploads/" }); // Directory where files will be saved

// app.post("/upload", upload.array("uploadPictures"), async (req, res) => {
//   try {
//     // Check if files were uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send("No files were uploaded.");
//     }

//     // Extract file paths as strings
//     const fileUrls = req.files.map((file) => file.path); // Change this to the actual file URL if needed

//     // Create a new post with the file URLs
//     const newPost = new Post({ uploadPictures: fileUrls /* other fields */ });
//     await newPost.save();

//     res.status(201).send(newPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error.");
//   }
// });

const upload = multer({
  dest: "uploads/", // Specify the upload directory
});

export default upload;
