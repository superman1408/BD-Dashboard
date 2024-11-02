import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
    },
    clientName: {
      type: String,
    },
    projectNumber: {
      type: String,
    },
    commencementDate: {
      type: String,
    },
    projectManager: {
      type: String,
    },
    selectedFile: {
      type: String,
    },
    scope: {
      type: String,
    },
    poUnpriced: {
      type: String,
    },
    projectGoverning: {
      type: String,
    },
    teams: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);
export default ProjectDetails;
