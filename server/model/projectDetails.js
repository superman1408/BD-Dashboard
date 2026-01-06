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
    endDate: {
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
    termsConditions: {
      type: String,
    },
    teams: {
      type: String,
    },
    status: {
      type: String,
    },
    // currentTaskDone: {
    //   type: [Number],
    //   required: true,
    // },
    currentTaskDone: [
      {
        _id: false,
        month: { type: String, required: true },
        index: { type: Number, required: true },
        value: { type: Number, required: true },
      },
    ],

    totalTask: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);
export default ProjectDetails;
