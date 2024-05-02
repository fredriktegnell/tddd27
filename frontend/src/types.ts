export interface TableStandingsType {
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
}


  
export interface Gameweek {
  team_a: string;
  team_h: string;
  team_a_score: number;
  team_h_score: number;
  kickoff_time: string;
  event: number;
  id: number;
}

export interface Match {
  id: number;
  event: number;
  kickoff_time: string;
  team_h: string;
  team_a: string;
  team_h_score: number;
  team_a_score: number;
  stats: Stat[];
}

export interface StatElement {
  value: number;
  
}

export interface Stat {
  identifier: string;
  a: StatElement[];
  h: StatElement[];
}

export interface GameBet {
  event: number,
  fixtureId: number ;
  winner?: 'team_a' | 'team_h' | 'draw'; // Optional: 'team_a' for away win, 'team_h' for home win
  goalsH?: number; // Optional: Goals scored by the home team
  goalsA?: number; // Optional: Goals scored by the away team
  shotsH?: number; // Optional: Shots taken by the home team
  shotsA?: number; // Optional: Shots taken by the away team
  shotsOnGoalH?: number; // Optional: Shots on goal by the home team
  shotsOnGoalA?: number; // Optional: Shots on goal by the away team
  yellowCardsH?: number; // Optional: Yellow cards received by the home team
  yellowCardsA?: number; // Optional: Yellow cards received by the away team
  redCardsH?: number; // Optional: Red cards received by the home team
  redCardsA?: number; // Optional: Red cards received by the away team
  cornersH?: number; // Optional: Corners won by the home team
  cornersA?: number; // Optional: Corners won by the away team
}

export interface ExtendedGameBet extends GameBet {
  email: string;
  uid: string;
}

export interface UserData  {
  email: string,
  username: string,
  favouriteTeam: string,
  friends: string[]

}




  