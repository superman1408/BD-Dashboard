import mongoose from "mongoose";
const authSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    menHourCost: {
      type: String,
    },
    menHourLeft: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
