import React, { useEffect, useState }from 'react';
import { Gameweek, GameBet, Match } from '../types';
import { fetchGame } from '../api/results';

interface UserBetsProps {
  userBet: GameBet | null;
}

const UserBets: React.FC<UserBetsProps> = ({ userBet }) => {
    const [fixture, setFixture] = useState<Match>();

    useEffect(() => {
        if (userBet) {
            const fetchMatchData = async () => {
                const matchData = await fetchGame(Number(userBet.event), Number(userBet.fixtureId));
                setFixture(matchData);
            };

            fetchMatchData();
        }
    }, [userBet]);

    if (!userBet || !fixture) {
        
        return <div className='text-white'>Loading bets...</div>;
    }

  return (
    <div className="flex justify-center w-full lg:w-3/4 mx-auto text-black">
      <div className="bg-white rounded-lg shadow-md p-0 md:p-2 w-full lg:w-3/4 ">
        <div className="grid grid-cols-3 text-center mb-8 border-b-2 border-gray-300">
          {/* Display Team Names and Winner */}
          <div className='mb-4'>
            <h2 className="font-bold md:text-xl truncate ...">{fixture.team_h}</h2>
            <p className="text-xl md:text-2xl mt-2 mb-2">{userBet.winner === 'team_h' ? 'Winner' : ''}</p>
          </div>
          <div>
            <h2 className="font-bold md:text-xl truncate ...">Draw</h2>
            <p className="text-xl md:text-2xl mt-2 mb-2">{userBet.winner === 'draw' ? 'Draw' : ''}</p>
          </div>
          <div>
            <h2 className="font-bold md:text-xl truncate ...">{fixture.team_a}</h2>
            <p className="text-xl md:text-2xl mt-2 mb-2">{userBet.winner === 'team_a' ? 'Winner' : ''}</p>
          </div>
        </div>

        {/* Display Bet Details */}
        <div className="grid grid-cols-3  text-center">
          <div>
            {/* Display Home Team Bet Details */}
            <div className="lg:font-bold mb-3 ">{userBet.goalsH}</div>
            <div className="lg:font-bold mb-3 ">{userBet.shotsH}</div>
            <div className="lg:font-bold mb-3 ">{userBet.shotsOnGoalH}</div>
            <div className="lg:font-bold mb-3 ">{userBet.yellowCardsH}</div>
            <div className="lg:font-bold mb-3 ">{userBet.redCardsH}</div>
            <div className="lg:font-bold mb-3 ">{userBet.cornersH}</div>
          </div>

          <div>
            <h3 className='truncate ... lg:font-bold mb-3'>Goals</h3>
            <h3 className='truncate ... lg:font-bold mb-3'>Shots</h3>
            <h3 className='truncate ... lg:font-bold mb-3'>Shots on Goal</h3>
            <h3 className='truncate ... lg:font-bold mb-3'>Yellow Cards</h3>
            <h3 className='truncate ... lg:font-bold mb-3'>Red Cards</h3>
            <h3 className='truncate ... lg:font-bold mb-3'>Corners</h3>
          </div>

          <div>
            {/* Display Away Team Bet Details */}
            <div className="lg:font-bold mb-3 ">{userBet.goalsA}</div>
            <div className="lg:font-bold mb-3 ">{userBet.shotsA}</div>
            <div className="lg:font-bold mb-3 ">{userBet.shotsOnGoalA}</div>
            <div className="lg:font-bold mb-3 ">{userBet.yellowCardsA}</div>
            <div className="lg:font-bold mb-3 ">{userBet.redCardsA}</div>
            <div className="lg:font-bold mb-3 ">{userBet.cornersA}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBets;
