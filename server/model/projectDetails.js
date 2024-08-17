import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
  },
  docNo: {
    type: String,
  },
});

const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);
export default ProjectDetails;
