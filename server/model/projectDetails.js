import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  serialNo: {
    type: [String],
  },
  bidNo: {
    type: [String],
  },
  clientName: {
    type: [String],
  },
  opportunityDetail: {
    type: [String],
  },
  probability: {
    type: [String],
  },
  amount: {
    type: [String],
  },
  weightageAmount: {
    type: [String],
  },
  status: {
    type: [String],
  },
});
 
const ProjectDetails = mongoose.model("ProjectDetails", projectSchema);
export default ProjectDetails;
