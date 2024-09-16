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


export const getPost = async (req, res) => {
  console.log("Hello Getting POST.....!!!");
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id Available...!!!" });
  }
  const post = await EntryOverview.findOne({ docNo: id });
  console.log(post);
  res.status(200).json(post);  
};



// -------------------This function will be used for updating the entryDetails Model in API-------------------

export const entryDetails = async (req, res) => {
  const value = req.body;
  const projectNumber = value.docNo;
  if (!projectNumber) {
    return res.status(400).json({ message: "Project number is required" });
  }

  const updatePost = await EntryOverview.findOne({ docNo: projectNumber });

  if (!updatePost) {
    return res
      .status(400)
      .json({ message: "No Such Posts Found in Database..!!!" });
  }

  const id = updatePost._id;
  updatePost.date.push(value.date);
  updatePost.activity1.push(value.activity1);
  updatePost.activity2.push(value.activity2);
  updatePost.activity3.push(value.activity3);
  updatePost.activity4.push(value.activity4);
  updatePost.maleLabour.push(value.maleLabour);
  updatePost.femaleLabour.push(value.femaleLabour);
  updatePost.mason.push(value.mason);
  updatePost.uploadPictures.push(value.uploadPictures);
  updatePost.submittedBy.push(value.submittedBy);

  const updated = await EntryOverview.findByIdAndUpdate(id, updatePost, {
    new: true,
  });

  res.json(updated);
};

export const getEntryDetails = async (req, res) => {
  try {
    const postMessage = await EntryOverview.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
