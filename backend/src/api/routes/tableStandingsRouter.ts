import express from "express";
import { getTableStanding } from "../controllers/tableStandings";

const router = express.Router();

router.get("/table-standings", getTableStanding);

export default router;
