import mongoose from "mongoose";

const filesSchema = mongoose.Schema(
  {
    contactEmail: {
      type: String,
    },
    contractorName: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    contactNumber: {
      type: String,
    },

    contractAddress: {
      type: String,
    },
    contractBillingAddress: {
      type: String,
    },

    contractStartDate: {
      type: String,
    },
    contractEndDate: {
      type: String,
    },
    bankGuranteeSubmitted: {
      type: String,
    },
    GSTNo: {
      type: String,
    },
    // GST: { type: Buffer },

    PANNo: {
      type: String,
    },
    incorporationCertificateNo: {
      type: String,
    },
    bankGuaranteeNo: {
      type: String,
    },
    bankGuranteeStartDate: {
      type: String,
    },
    bankGuranteeEndDate: {
      type: String,
    },
    // bankGurantee: {
    //   type: String,
    // },
    contractValue: {
      type: String,
    },
    contractCurrency: {
      type: String,
    },
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

// I have a model of mixed type data buffer & string & I want to uplaod these all in same database pdf files are uploading fine the problem is in string how to do it
