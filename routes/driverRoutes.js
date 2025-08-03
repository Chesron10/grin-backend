import express from "express";
import { createDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver } from "../controllers/driverController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Driver routes
router.post("/", createDriver);
router.get("/", auth, getAllDrivers);
router.get("/:id", auth, getDriverById);
router.put("/:id", auth, updateDriver);
router.delete("/:id", auth, deleteDriver);

export default router;
