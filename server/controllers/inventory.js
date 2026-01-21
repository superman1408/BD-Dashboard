import mongoose from "mongoose";
import inventoryDetails from "../model/inventoryDetails.js";


export const inventoryList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  // console.log("Inventory is listening");
  

  try {
    const updatedPost = await inventoryDetails.findByIdAndUpdate(
      console.log("Working on inventory server"),
      
      id,
      {
        $push: {
          material: value.material,
          quantity: value.quantity,
          unit: value.unit,
          remarks:value.remarks,
          status: value.status,
          image:value.image,
          submittedAt: value.submittedAt,
          displayTime: value.displayTime,
        },
      },
      {
        new: true,
        upsert: true, // ✅ create document if it doesn’t exist
        setDefaultsOnInsert: true, // ✅ apply default [] from schema
      }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};