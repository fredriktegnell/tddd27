import { Response, Request } from "express";

interface tableStandings {
    index: number,
    team: string,
    gamesPlayed: number,
    gamesWon: number,
    gamesDrawn: number,
    gamesLost: number,
    goalsScored: number,
    goalsConceded:number,
    goalDifference: number,
    totalPoints: number,
};

export const getTableStanding = (req: Request, res: Response) => {
    let tableStandingsRaw: tableStandings[] = [];
    for(let i = 1; i < 21; i++){
        const standing: tableStandings = {
            index: i,
            team: `Team ${ i }`,
            gamesPlayed: i,
            gamesWon: i,
            gamesDrawn: i,
            gamesLost: i,
            goalsScored: i,
            goalsConceded: i,
            goalDifference: i,
            totalPoints: i,
        }
        tableStandingsRaw.push(standing);
    }


    res.json(tableStandingsRaw);
};
