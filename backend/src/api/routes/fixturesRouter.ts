import express from "express";
import { getAllGameweeks, getFutureGameweeks, getGameweek, getStandings } from "../controllers/fixturesController";

const router = express.Router();
router.get('/all-gameweeks', getAllGameweeks);
router.get('/gameweek/:week', getGameweek);
router.get('/teamStandings', getStandings);
router.get('/future-gameweeks', getFutureGameweeks)

export default router;