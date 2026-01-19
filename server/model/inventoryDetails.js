import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
    {
       material: {
        type: String,
       },
        quantity: {
         type: String,   
        },
        unit:{
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
        submittedAt: {type: String,},
        displayTime: {type: String,},
    }
);

const InventorySchema = mongoose.model("inventoryDetails", inventorySchema);
export default InventorySchema;