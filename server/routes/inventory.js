import express from "express";

import {inventoryList} from "../controllers/inventory.js"

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/inventory", auth, inventoryList);

export default router;