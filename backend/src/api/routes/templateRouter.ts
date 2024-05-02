import express from "express";
import { getTemplates, addTemplate, updateTemplate, deleteTemplate } from "../controllers/templateController";

const router = express.Router();
router.get("/templates", getTemplates)
router.post("/add-template", addTemplate)
router.put("/edit-template/:id", updateTemplate)
router.delete("/delete-template/:id", deleteTemplate)

export default router;