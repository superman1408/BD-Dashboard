import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    material: {
      type: String,
    },
    quantity: {
      type: String,
    },
    unit: {
      type: String,
    },
    vendor: {
      type: String,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
    },
    image: {
      type: String,
    },
    // submittedAt: { type: String },
    // displayTime: { type: String },
  },
  {
    timestamps: true,
  },
);

const InventorySchema = mongoose.model("inventoryDetails", inventorySchema);
export default InventorySchema;
