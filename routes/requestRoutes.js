import express from "express";
import { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } from "../controllers/requestController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Request routes
router.post("/", auth, createRequest);
router.get("/", auth, getAllRequests);
router.get("/:id", auth, getRequestById);
router.put("/:id", auth, updateRequest);
router.delete("/:id", auth, deleteRequest);

export default router;
