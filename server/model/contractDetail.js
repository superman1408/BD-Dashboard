import mongoose from "mongoose";

const contractSchema = mongoose.Schema(
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

const ContractDetails = mongoose.model("ContractDetails", contractSchema);
export default ContractDetails;
