import { Request, Response,  } from "express";
import { getTeamByID } from "../datatransfers/datatransfers";
const axios = require('axios');
const FPL_API_BASE_URL = "https://fantasy.premierleague.com/api";


export const getTeam = (req: Request, res: Response) => {
    axios.get(`${FPL_API_BASE_URL}/bootstrap-static/`)
    .then((response: any) => {
        let team = getTeamByID(Number(req.params.teamID));
        res.json(team);
    })
};