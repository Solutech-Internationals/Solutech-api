import express from "express";

const router = express.Router();

import {
  createBike,
  readBike,
  readBikes,
  updateBike,
  deleteBike,
  saveBikes, deleteAllBikes, searchBikes,
} from "../controller/bikeController.ts";

router.post("/bike", createBike);
router.post("/saveBikes", saveBikes);
router.get("/bikes", readBikes);
router.get("/bike/:id", readBike);
router.put("/bike/:id", updateBike);
router.delete("/bike/:id", deleteBike);
router.delete("/bikes", deleteAllBikes);
router.get("/bikesSearch", searchBikes);

export default router;