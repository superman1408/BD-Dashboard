import mongoose from "mongoose";
import inventoryOverview from "../model/inventoryDetails.js";

export const inventoryList = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const {
    material,
    quantity,
    unit,
    vendor,
    remarks,
    status,
    // submittedAt,
    // displayTime,
  } = req.body;

  try {
    const newInventory = new inventoryOverview({
      id,
      material,
      quantity,
      unit,
      vendor,
      remarks,
      status,
      // submittedAt,
      // displayTime,
    });

    await newInventory.save();

    res.status(201).json(newInventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getInventoryDetails = async (req, res) => {
  try {
    const inventory = await inventoryOverview.find({});

    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
