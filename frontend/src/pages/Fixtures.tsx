import React, { useState} from "react";
import GameweekFixtures from "../components/GameweekFixtures";






const Fixtures: React.FC = () => {
    const [currentGameweek, setCurrentGameweek] = useState<number | undefined>();
    const handleCurrentGameweekChange = (gameweek: number | undefined) => {
        console.log(currentGameweek)
        setCurrentGameweek(gameweek);
    };
    return (
        <>
        <div className="w-3/4 h-full items-start mx-auto grid lg:grid-cols-[2fr,2fr] sm:grid-cols-[2fr,2fr] grid-cols gap-4">
            <div className="grid lg:grid-rows-2 gap-4">
            <div className="text-center   rounded-lg">
                <h3 className="text-white">Current Gameweek</h3>
                <GameweekFixtures week={currentGameweek ? currentGameweek : undefined } />
            </div>
            <div className="text-center  rounded-lg">
                <h3 className="text-white">Previous Gameweek</h3>
                <GameweekFixtures week={currentGameweek ? currentGameweek - 1 : undefined} />
            </div>
            </div>
            <div className="text-center  rounded-lg">
                <h3 className="text-white">Upcoming Gameweeks</h3>

                <GameweekFixtures
                future={true}
                multiple={true}
                onCurrentGameweekChange={handleCurrentGameweekChange}
                />
            </div>
        </div>
        
        </>
      );
    };
  
  export default Fixtures;