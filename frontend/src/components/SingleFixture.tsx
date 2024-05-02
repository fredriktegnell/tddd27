import React from 'react';
import { Gameweek } from "../types";
import { formatDate, formatTime } from "../utils/helpermethods";

interface SingleFixtureProps {
    fixture: Gameweek;
}

const SingleFixture: React.FC<SingleFixtureProps> = ({ fixture }) => (
    <div
        className={`bg-gray-100 p-1 my-1 mx-1 rounded-md items-center text-left relative`}
    >
        <div className="grid grid-cols-[3fr,5fr,1fr]">
            <div className="border-r-2 border-gray-300 text-center items-center">
                {formatDate(fixture.kickoff_time)}
            </div>
            <div className="border-b-2 border-gray-300 ml-1 truncate ...">
                {fixture.team_h}
            </div>
            <div
                className={`border-b-2 border-gray-300 text-right ${
                    fixture.team_h_score > fixture.team_a_score
                        ? "font-black text-black"
                        : "font-thin"
                }`}
            >
                {fixture.team_h_score}
            </div>
        </div>
        <div className="grid grid-cols-[3fr,5fr,1fr]">
            <div className="border-r-2 border-gray-300 text-center items-center">
                {formatTime(fixture.kickoff_time)}
            </div>
            <div className="ml-1 truncate ...">
                {fixture.team_a}
            </div>
            <div
                className={`text-right ${
                    fixture.team_a_score > fixture.team_h_score
                        ? "font-black text-black"
                        : "font-thin"
                }`}
            >
                {fixture.team_a_score}
            </div>
        </div>
    </div>
);

export default SingleFixture;
