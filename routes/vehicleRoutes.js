import express from "express";
import multer, { memoryStorage } from "multer";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: memoryStorage() });

// Vehicle routes
router.post("/", auth, upload.single("file"), createVehicle);
router.get("/", auth, getAllVehicles);
router.get("/:id", auth, getVehicleById);
router.put("/:id", auth, upload.single("file"), updateVehicle);
router.delete("/:id", auth, deleteVehicle);

export default router;
