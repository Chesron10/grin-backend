import express from "express";
import { createAdmin, updateAdmin, deleteAdmin } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Admin routes
router.post("/", createAdmin);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

export default router;
