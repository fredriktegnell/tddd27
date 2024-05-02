import express from 'express';
import { addGameBet, changeGameBet, getGameBetsByEmail, getGameBetsByUid, getGameBetsByUsername } from '../controllers/gameBetController';

const router = express.Router();

router.post('/gamebets', addGameBet);
router.put('/gamebets/:fixtureId/:uid', changeGameBet); // Include the :id and :uid parameters
router.get('/gamebets/email/:email', getGameBetsByEmail);
router.get('/gamebets/username/:username', getGameBetsByUsername);
router.get('/gamebets/uid/:uid', getGameBetsByUid);

export default router;
