import mongoose from "mongoose";
import ProjectOverview from "../model/projectDetails.js";

export const createPost = async (req, res) => {
  const Post = req.body;

  const newPost = new ProjectOverview(Post);
  try {
    await newPost.save();
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
