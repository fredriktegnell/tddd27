import { Response, Request } from 'express';
import { GameBetModel } from '../models/gameBetModel';
import { UserModel } from '../models/userModel';
export const getGameBetsByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const gameBets = await GameBetModel.find({ email });
    return res.json(gameBets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getGameBetsByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username});
    if(!user){
      return res.status(404).json({message: 'User could not be found'});
    }
    const userBets = await GameBetModel.find( { uid: user.firebaseUid })
    return res.json(userBets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
  
export const getGameBetsByUid = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    const gameBets = await GameBetModel.find({ uid });
    return res.json(gameBets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addGameBet = async (req: Request, res: Response) => {
  try {
    const gameBetData = req.body;
    const createdGameBet = await GameBetModel.create(gameBetData);
    return res.json(createdGameBet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const changeGameBet = async (req: Request, res: Response) => {
    try {
      const { fixtureId, uid } = req.params;
      const updatedGameBetData = req.body;
  
      const updatedGameBet = await GameBetModel.findOneAndUpdate(
        { fixtureId: fixtureId, uid: uid }, // Find the document with the specified ID and UID
        updatedGameBetData,
        {new: true}
      );
  
      if (!updatedGameBet) {
        return res.status(404).json({ error: 'Game bet not found' });
      }
  
      return res.json(updatedGameBet);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  