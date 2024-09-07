import mongoose from "mongoose";
import ProjectOverview from "../model/projectDetails.js";
import EntryOverview from "../model/entryDetails.js";




export const createPost = async (req, res) => {
  const Post = req.body;

  const newPost = new ProjectOverview(Post);
  const createDetail = new EntryOverview(Post);
  try {
    await newPost.save();
    await createDetail.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};




export const getPosts = async (req, res) => {
  try {
    const postMessage = await ProjectOverview.find({});

    res.status(200).json(postMessage);
  } catch (error) {
    res.return(404).json({ message: error.message });
  }
};




// -------------------This function will be used for updating the entryDetails Model in API-------------------
export const entryDetails = async (req, res) => {
  const Post = req.body;
  const projectNumber = Post.docNo;
  if (!projectNumber) {
    return res.status(400).json({ message: "Project number is required" });
  }
  
  const updatePost = await EntryOverview.findOne({docNo:projectNumber});

  console.log(updatePost);
};



export const getEntryDetails = async (req, res) => {
  try {
    const postMessage = await EntryOverview.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

