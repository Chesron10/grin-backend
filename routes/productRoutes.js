import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Product routes
router.post("/", auth, createProduct);
router.get("/", auth, getAllProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
