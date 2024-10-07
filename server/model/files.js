import mongoose from "mongoose";

const filesSchema = mongoose.Schema(
  {
    //   id: {
    //     type: String,
    //   },
    GST: {
      type: Buffer,
    },
    PAN: {
      type: Buffer,
    },
    incorporationCertificate: {
      type: Buffer,
    },
    bankGurantee: {
      type: Buffer,
    },
    signedContractCopy: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const filesDetails = mongoose.model("filesDetails", filesSchema);
export default filesDetails;
