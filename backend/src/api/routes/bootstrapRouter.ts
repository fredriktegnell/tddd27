import express from "express";
import { getTeam } from "../controllers/bootstrapController";

const router = express.Router();
router.get('/teams/:teamID', getTeam);

export default router;