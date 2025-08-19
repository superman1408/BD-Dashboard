import mongoose from "mongoose";

const entrySchema = mongoose.Schema(
  {
    date: {
      type: [String],
    },
    activityList: {
      type: [String],
    },
    plannedWorkList: {
      type: [String],
    },

    materialInventoryList: {
      type: [String],
    },

    materialRequiredList: {
      type: [String],
    },

    procurementList: {
      type: [String],
    },
    maleLabour: {
      type: [Number],
    },
    femaleLabour: {
      type: [Number],
    },
    mason: {
      type: [Number],
    },
    attendance: {
      type: [String],
    },
    uploadPictures1: {
      type: [String], // Change this line
      default: [],
    },
    uploadPictures2: {
      type: [String], // Change this line
      default: [],
    },
    uploadPictures3: {
      type: [String], // Change this line
      default: [],
    },
    uploadPictures4: {
      type: [String], // Change this line
      default: [],
    },
    uploadPictures5: {
      type: [String], // Change this line
      default: [],
    },
    preparedBy: {
      type: [String],
    },
    reviewedBy: {
      type: [String],
    },
    projectName: {
      type: String,
    },
    clientName: {
      type: String,
    },
    projectNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EntryDetails = mongoose.model("EntryDetails", entrySchema);
export default EntryDetails;
