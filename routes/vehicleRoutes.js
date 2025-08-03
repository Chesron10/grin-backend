import express from "express";
import { createVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle } from "../controllers/vehicleController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Vehicle routes
router.post("/", auth, createVehicle);
router.get("/", auth, getAllVehicles);
router.get("/:id", auth, getVehicleById);
router.put("/:id", auth, updateVehicle);
router.delete("/:id", auth, deleteVehicle);

export default router;
