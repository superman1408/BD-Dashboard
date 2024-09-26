import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
    },
    clientName: {
      type: String,
    },
    docNo: {
      type: String,
    },
    selectedFile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);
export default ProjectDetails;
