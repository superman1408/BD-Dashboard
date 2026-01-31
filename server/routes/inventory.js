import express from "express";

import {
  inventoryList,
  getInventoryDetails,
} from "../controllers/inventory.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/inventory", auth, inventoryList);

router.get("/inventoryDetails/view", getInventoryDetails);

export default router;
