import { Request, Response,  } from "express";
import { getTeamStats, getTeamByID, getGamesPlayedByID, idToName } from "../datatransfers/datatransfers";
const axios = require('axios');
const FPL_API_BASE_URL = "https://fantasy.premierleague.com/api";

export const getAllGameweeks = (_req: Request, res: Response) => {
    axios.get(`${FPL_API_BASE_URL}/fixtures`)
    .then((response: any) => {
        let gameweeks = idToName(response.data);
        res.send(gameweeks);
    })
};

export const getGameweek = (req: Request, res: Response) => {
    axios.get(`${FPL_API_BASE_URL}/fixtures/?event=${req.params.week}`)
    .then((response: any) => {
        let gameweek = idToName(response.data);
        res.send(gameweek);
    })
};

export const getFutureGameweeks = (req: Request, res: Response) => {
    axios.get(`${FPL_API_BASE_URL}/fixtures/?future=1`)
    .then((response: any) => {
        let gameweek = idToName(response.data);
        res.send(gameweek);
    })
};

interface tableStandings {
    totalPoints: number,
    index: number,
    team: string,
    gamesPlayed: number,
    gamesWon: number,
    gamesDrawn: number,
    gamesLost: number,
    goalsScored: number,
    goalsConceded:number,
    goalDifference: number,

};

export const getStandings = (req: Request, res: Response) => {
    let tableStandingsRaw: tableStandings[] = [];
    axios.get(`${FPL_API_BASE_URL}/fixtures`)
    .then((response: any) => {
        for(let i = 1; i <= 20; i++){
            let stats = getTeamStats(response.data, i);
            const standing: tableStandings = {
                index: i,
                team: getTeamByID(i),
                gamesPlayed: getGamesPlayedByID(response.data, i),
                gamesWon: stats.totalWins,
                gamesDrawn: stats.totalDraws,
                gamesLost: stats.totalLosses,
                goalsScored: stats.totalGoals,
                goalsConceded: stats.totalConceded,
                goalDifference: stats.totalGoals - stats.totalConceded,
                totalPoints: stats.totalPoints,
            }
            tableStandingsRaw.push(standing);
        }
        // Sorting based on totalpoints (or goal difference if equal totalpoints)
        tableStandingsRaw.sort((n1, n2) => { 
            if (n1.totalPoints == n2.totalPoints) {
                if (n1.goalDifference < n2.goalDifference) {
                    return 1;
                }
                if (n1.goalDifference > n2.goalDifference) {
                    return -1;
                } 
            }
            if (n1.totalPoints < n2.totalPoints) {
                return 1;
            }
            if (n1.totalPoints > n2.totalPoints) {
                return -1;
            }
            return 0;
        }) ;
        res.json(tableStandingsRaw);
    })
};