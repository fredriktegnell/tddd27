import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGame } from "../api/results"; 
import { Match } from "../types";
import { formatDate, formatTime } from "../utils/helpermethods";

interface MatchViewProps {}

const MatchView: React.FC<MatchViewProps> = () => {
    const { week, id } = useParams<{ week: string, id: string }>();
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        const fetchMatchData = async () => {
            const matchData = await fetchGame(Number(week), Number(id));
            setMatch(matchData);
        };

        fetchMatchData();
    }, [week, id]);

    if (!match) {
        return <div className="flex justify-center text-white">Loading...</div>;
    }
    
    const yellowCardsStat = match.stats.find(stat => stat.identifier === 'yellow_cards');
    const redCardsStat = match.stats.find(stat => stat.identifier === 'red_cards');
    const yellowCardsTeamA = yellowCardsStat?.a.length || 0;
    const yellowCardsTeamH = yellowCardsStat?.h.length || 0;
    const redCardsTeamA = redCardsStat?.a.length || 0;
    const redCardsTeamH = redCardsStat?.h.length || 0;

    const shotsTeamH = 12;
    const shotsOnGoalTeamH = 5;
    const cornersTeamH = 7;

    const shotsTeamA = 8;
    const shotsOnGoalTeamA = 3;
    const cornersTeamA = 4;
  
    return (
        <div className="flex justify-center ">
            <div className="bg-white rounded-lg shadow-md p-2 md:p-10 sm:w-2/3  lg:w-1/3">
                <div className="grid grid-cols-3 text-center mb-8 border-b-2 border-gray-300">
                    <div>
                        <h2 className="font-bold md:text-2xl">{match.team_h}</h2>
                        <p className="text-2xl md:text-4xl mt-2 mb-2">{match.team_h_score}</p>
                    </div>
                    <div>
                        <div className="text-2xl"> - </div>
                        <div className="md:text-xl">{formatTime(match.kickoff_time)}</div>
                        <div className="md:text-xl">{formatDate(match.kickoff_time)}</div>
                        
                    </div>
                    <div>
                        <h2 className="font-bold md:text-2xl">{match.team_a}</h2>
                        <p className="text-2xl md:text-4xl mt-2 mb-2">{match.team_a_score}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3  text-center border-b-2 border-gray-300">
                    <div>
                        <div className="font-bold mb-4">{shotsTeamH}</div>
                        <div className="font-bold mb-4">{shotsOnGoalTeamH}</div>
                        <div className="font-bold mb-4">{yellowCardsTeamH}</div>
                        <div className="font-bold mb-4">{redCardsTeamH}</div>
                        <div className="font-bold mb-4">{cornersTeamH}</div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Shots</h3>
                        <h3 className="font-bold mb-4">Shots on Goal</h3>
                        <h3 className="font-bold mb-4">Yellow Cards</h3>
                        <h3 className="font-bold mb-4">Red Cards</h3>
                        <h3 className="font-bold mb-4">Corners</h3>
                    </div>
                    <div>
                        <div className="font-bold mb-4">{shotsTeamA}</div>
                        <div className="font-bold mb-4">{shotsOnGoalTeamA}</div>
                        <div className="font-bold mb-4">{yellowCardsTeamA}</div>
                        <div className="font-bold mb-4">{redCardsTeamA}</div>
                        <div className="font-bold mb-4">{cornersTeamA}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchView;
