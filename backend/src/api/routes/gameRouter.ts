import express from "express";
import { getGame } from "../controllers/gameController";

const router = express.Router();

router.get("/gameweek/:week/:id", getGame);


export default router;
