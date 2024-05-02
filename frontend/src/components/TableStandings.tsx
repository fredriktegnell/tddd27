import React, { useEffect, useState} from "react";
import { fetchTableStandings } from "../api/getStandings";
import { TableStandingsType } from "../types";
import { fetchStandings } from "../api/results";


interface TableStandingsProps {}

const TableStandings: React.FC<TableStandingsProps> = () => {
    const [tableStandings, setTableStandings] = useState<TableStandingsType[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchStandings();
            setTableStandings(data);
        }
        fetchData();
    }, []);
    return (
        <div className="w-full flex flex-col items-center text-center">
            <div className="max-w-xl">
                <h2 className="text-sm text-white mb-4">Table Standings</h2>
                <div className="bg-gray-100 p-1 mb-2 rounded-md font-bold">
                    <div className="grid md:grid-cols-[5fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] grid-cols-[5fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-1">
                    {["Team", "GP", "W", "D", "L", "GS", "GC", "GD", "P"].map(
                        (header, index) => (
                            <div
                              key={index}
                              className={`border-r border-gray-200 last:border-r-0 p-0 ${
                                header === "Team" ? "text-left ml-2" : ""
                              } ${index === 5 || index === 6 ? "hidden md:block" : ""}`}
                            >
                            {header}
                        </div>
                    ))}
                    </div>
                </div>
                {tableStandings.map((standing, index) => (
                    <div key={index} className={`bg-gray-100 p-1 mb-0 
                    ${index === 0 ? "rounded-t-md border-b-2 border-blue-400": 
                    index === tableStandings.length-1 ? "rounded-b-md": 
                    (0 < index && index <=3) ? "border-b-2 border-blue-400" : 
                    index === 4 ? "border-b-2 border-orange-500" : "border-b-2 border-gray-300"}`}>
                        <div className="grid md:grid-cols-[5fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] grid-cols-[5fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-1">
                            <div className="border-r border-gray-250 p-0 text-left ml-2 truncate ...">{standing.team}</div>
                            <div className="border-r border-gray-200 p-0 ">{standing.gamesPlayed}</div>
                            <div className="border-r border-gray-200 p-0">{standing.gamesWon}</div>
                            <div className="border-r border-gray-200 p-0">{standing.gamesDrawn}</div>
                            <div className="border-r border-gray-200 p-0">{standing.gamesLost}</div>
                            <div className="border-r border-gray-200 p-0 hidden md:block">{standing.goalsScored}</div>
                            <div className="border-r border-gray-200 p-0 hidden md:block">{standing.goalsConceded}</div>
                            <div className="border-r border-gray-200 p-0">{standing.goalDifference}</div>
                            <div className="border-r-0 border-gray-200 p-0">{standing.totalPoints}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableStandings;
