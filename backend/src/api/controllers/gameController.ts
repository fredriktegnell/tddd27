import { Request, Response,  } from "express";
import { getTeamStats, getTeamByID, getGamesPlayedByID, idToName } from "../datatransfers/datatransfers";

const axios = require('axios');
const FPL_API_BASE_URL = "https://fantasy.premierleague.com/api";


export const getGame = (req: Request, res: Response) => {
    axios.get(`${FPL_API_BASE_URL}/fixtures/?event=${req.params.week}`)
        .then((response: any) => {
            idToName(response.data);
            let game = response.data.find((game: any) => game.id === parseInt(req.params.id));
            
            
            if (game) {
                res.send(game) // Use idToName to convert team ids to names
            } else {
                res.status(404).send('Game not found');
            }
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500).send('Error retrieving game');
        });
};
