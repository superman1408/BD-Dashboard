import mongoose from "mongoose";

const contractSchema = mongoose.Schema(
  {
    contractorName: {
      type: String,
    },
    contactperson: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contractAddress: {
      type: String,
    },
    contractBillingAddress: {
      type: String,
    },
    // GST: {
    //   type: String,
    // },
    // GST: { type: Buffer },

    // PAN: {
    //   type: String,
    // },
    // incorporationCertificate: {
    //   type: String,
    // },
    contractStartDate: {
      type: String,
    },
    contactEndDate: {
      type: String,
    },
    bankGuranteeSubmitted: {
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
    // signedContractCopy: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const ContractDetails = mongoose.model("ContractDetails", contractSchema);
export default ContractDetails;
