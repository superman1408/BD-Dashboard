import mongoose from "mongoose";

const entrySchema = mongoose.Schema({
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
  uploadPictures: {
    type: [String],
  },
  submittedBy: {
    type: [String],
  },
});

const EntryDetails = mongoose.model("EntryDetails", entrySchema);
export default EntryDetails;
