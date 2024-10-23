import mongoose from "mongoose";

const entrySchema = mongoose.Schema(
  {
    date: {
      type: [String],
    },
    activity1: {
      type: [String],
    },
    activity2: {
      type: [String],
    },
    activity3: {
      type: [String],
    },
    activity4: {
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
    submittedBy: {
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
