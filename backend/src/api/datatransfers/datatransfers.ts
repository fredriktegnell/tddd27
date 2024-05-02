export const getTeamByID = (teamID: number): string => {
    const teams = [
        "Arsenal", 
        "Aston Villa", 
        "Bournemouth", 
        "Brentford", 
        "Brighton",
        "Chelsea",
        "Crystal Palace",
        "Everton",
        "Fulham",
        "Leicester",
        "Leeds",
        "Liverpool",
        "Man City",
        "Man Utd",
        "Newcastle",
        "Nott'm Forest",
        "Southampton",
        "Spurs",
        "West Ham",
        "Wolves"
    ];
    return teams[teamID-1];
}

export const idToName = (data: any): any => {
    if(data.length == 1){
        data.team_a = getTeamByID(data.team_a);
        data.team_h = getTeamByID(data.team_h);
    }
    else{
        for (var i = 0; i < data.length; i++){
            data[i].team_h = getTeamByID(data[i].team_h);
            data[i].team_a = getTeamByID(data[i].team_a);
        }
    }
    
    return data;
}

export const getGamesPlayedByID = (data: any, teamID: number): number => {
    let gamesPlayed = 0;
    for (var i = 0; i < data.length; i++){
        if ((data[i].team_h == teamID || data[i].team_a == teamID) && data[i].started == true) {
            gamesPlayed++;
        }
    }
    return gamesPlayed;
}

export const getTeamStats = (data: any, teamID: number): any => {
    const stats = {
        totalWins: 0,
        totalDraws: 0,
        totalLosses: 0,
        totalPoints: 0,
        totalGoals: 0,
        totalConceded: 0,
    }
    for (var i = 0; i < data.length; i++){
        if (data[i].team_h_score != null && data[i].team_a_score != null) {
            if (data[i].team_h == teamID) {
                stats.totalGoals += data[i].team_h_score;
                stats.totalConceded += data[i].team_a_score;
                if (data[i].team_h_score > data[i].team_a_score){
                    stats.totalWins++;
                    stats.totalPoints += 3;
                }
                else if (data[i].team_h_score == data[i].team_a_score) {
                    stats.totalPoints += 1;
                    stats.totalDraws++;
                }
                else {
                    stats.totalLosses++;
                }
            }
            else if (data[i].team_a == teamID){
                stats.totalGoals += data[i].team_a_score;
                stats.totalConceded += data[i].team_h_score;
                if (data[i].team_a_score > data[i].team_h_score){
                    stats.totalWins++;
                    stats.totalPoints += 3;
                }
                else if (data[i].team_a_score == data[i].team_h_score) {
                    stats.totalPoints += 1;
                    stats.totalDraws++;
                }
                else {
                    stats.totalLosses++;
                }
            }
        }
    }
    return stats;
}
