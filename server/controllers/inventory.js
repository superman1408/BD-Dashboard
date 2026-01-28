import mongoose from "mongoose";
import inventoryOverview from "../model/inventoryDetails.js";


export const inventoryList = async (req, res) => {

  const {id} = req.params;
  console.log(id);
  
  
  const {
    
    material,
    quantity,
    unit,
    vendor,
    remarks,
    submittedAt,
    displayTime,
  } = req.body;

  try {
    const newInventory = new inventoryOverview({
      id,
      material,
      quantity,
      unit,
      vendor,
      remarks,
      submittedAt,
      displayTime,
    });

    await newInventory.save();

    res.status(201).json(newInventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
