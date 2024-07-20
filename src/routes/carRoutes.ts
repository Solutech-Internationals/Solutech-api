import express from "express";

const router = express.Router();

import {
  createCar,
  readCar,
  readCars,
  updateCar,
  deleteCar,
  saveCars,
} from "../controller/carController.ts";

router.post("/car", createCar);
router.post("/saveCars", saveCars);
router.get("/cars", readCars);
router.get("/car/:id", readCar);
router.put("/car/:id", updateCar);
router.delete("/car/:id", deleteCar);

export default router;
