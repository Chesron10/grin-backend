import express from "express";
import { createSME, getAllSMEs, getSMEById, updateSME, deleteSME } from "../controllers/smeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// SME routes
router.post("/", auth, createSME);
router.get("/", auth, getAllSMEs);
router.get("/:id", auth, getSMEById);
router.put("/:id", auth, updateSME);
router.delete("/:id", auth, deleteSME);

export default router;
