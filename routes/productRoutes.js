import express from "express";
import multer, { memoryStorage } from "multer";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
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

// Product routes
router.post("/", auth, upload.array("files", 5), createProduct);
router.get("/", auth, getAllProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, upload.array("files", 5), updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
