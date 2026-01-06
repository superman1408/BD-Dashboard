import mongoose from "mongoose";

const SCurveSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    totalTasks: { type: Number, required: true },

    // Store monthly completed values
    monthlyCompleted: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("SCurve", SCurveSchema);
