import mongoose from "mongoose";
const authSchema = mongoose.Schema({
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
  
});

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
