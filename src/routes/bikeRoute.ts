import express from "express";

const router = express.Router();

import {
  createBike,
  readBike,
  readBikes,
  updateBike,
  deleteBike,
  saveBikes, deleteAllBikes,
} from "../controller/bikeController.ts";

router.post("/bike", createBike);
router.post("/saveBikes", saveBikes);
router.get("/bikes", readBikes);
router.get("/bike/:id", readBike);
router.put("/bike/:id", updateBike);
router.delete("/bike/:id", deleteBike);
router.delete("/bikes", deleteAllBikes);

export default router;