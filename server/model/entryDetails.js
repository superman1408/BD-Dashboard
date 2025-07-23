import mongoose from "mongoose";

const entrySchema = mongoose.Schema(
  {
    date: {
      type: [String],
    },
    activityList: [
      {
        text: String,
        image: mongoose.Schema.Types.Mixed,
      },
    ],

    materialRequiredList: [
      {
        description: String,
        quantity: String,
      },
    ],
    procurementList: [
      {
        description: String,
        status: String,
      },
    ],

    plannedWorkList: [
      {
        description: String,
        status: String,
      },
    ],
    attendance: [
      {
        maleLabour: String,
        femaleLabour: String,
        mason: String,
        hqStaff: String,
        others: String,
      },
    ],

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
