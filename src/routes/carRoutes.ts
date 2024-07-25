import express from "express";

const router = express.Router();

import {
  createCar,
  readCar,
  readCars,
  updateCar,
  deleteCar,
  saveCars, deleteAllCars,
} from "../controller/carController.ts";

router.post("/car", createCar);
router.post("/saveCars", saveCars);
router.get("/cars", readCars);
router.get("/car/:id", readCar);
router.put("/car/:id", updateCar);
router.delete("/car/:id", deleteCar);
router.delete("/cars", deleteAllCars);

export default router;
