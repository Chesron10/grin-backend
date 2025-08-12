import express from "express";
import multer, { memoryStorage } from "multer";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const upload = multer({
  storage: memoryStorage(),
  limits: {
    fieldSize: 20 * 1024 * 1024,
    fileSize: 20 * 1024 * 1024,
    files: 5,
  },
});

// Request routes
router.post("/", auth, upload.array("files", 5), createRequest);
router.get("/", auth, getAllRequests);
router.get("/:id", auth, getRequestById);
router.put("/:id", auth, upload.array("files", 5), updateRequest);
router.delete("/:id", auth, deleteRequest);

export default router;
