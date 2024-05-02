import React, { useState } from 'react';
import { Gameweek, GameBet } from '../types';
import { formatTime, formatDate } from '../utils/helpermethods';
import { changeGameBet, getGameBetsByEmail, getGameBetsByUid, saveGameBet } from '../api/gameBets';

interface MatchBettingViewProps {
  fixture: Gameweek | null;
  openNotification: () => void;
  
}

const MatchBettingView: React.FC<MatchBettingViewProps> = ({ fixture, openNotification }) => {
    const [gameBet, setGameBet] = useState<GameBet | null>(null);
    const initialState: GameBet = {
      event: -1,
      fixtureId: -1,
      winner: undefined,
      goalsH: undefined,
      shotsH: undefined,
      shotsOnGoalH: undefined,
      yellowCardsH: undefined,
      redCardsH: undefined,
      cornersH: undefined,
      goalsA: undefined,
      shotsA: undefined,
      shotsOnGoalA: undefined,
      yellowCardsA: undefined,
      redCardsA: undefined,
      cornersA: undefined,
    };
    if (!fixture) {
        return <div>Loading...</div>;
    }
    const handleWinnerSelection = (winner: 'team_a' | 'team_h' | 'draw') => {
        console.log(winner)
        setGameBet((prevGameBet) => ({
        ...prevGameBet,
        winner,
        event: fixture.event,
        fixtureId: fixture.id,
        }));
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        console.log(gameBet)
        if (name !== 'winner') {
            // Check if the value is a number and less than 0
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue) && parsedValue < 0) {
                sanitizedValue = '0';
            }
        }
        setGameBet((prevGameBet) => ({
        ...prevGameBet,
        event: fixture.event,
        fixtureId: fixture.id,
        [name]: value,
        }));
    };

    const handlePlaceBet = async () => {
        try {
          if (gameBet && gameBet.fixtureId != -1 && gameBet.event != -1) {
            const data = await saveGameBet(gameBet);
            console.log('Bet placed:', data);
            openNotification();
            setGameBet(initialState);
            
          }
        } catch (error) {
          console.error('Error placing bet:', error);
          setGameBet(initialState);
        }
      };

  return (
    <div className="flex justify-center ">
      <div className="bg-white rounded-lg shadow-md p-0 md:p-2 w-full lg:w-3/4 ">
        <div className="grid grid-cols-3 text-center mb-8 border-b-2 border-gray-300">
        <div className='mb-3'>
            <h2 className="font-bold md:text-xl truncate ...">{fixture.team_h}</h2>
            <p className="text-2xl md:text-4xl mt-2 mb-2">{fixture.team_h_score}</p>
            <button
              className={`${
                gameBet?.winner === 'team_h' ? 'bg-green-500' : 'bg-gray-300'
              } text-white font-bold py-2 px-4 mx-1 rounded`}
              onClick={() => handleWinnerSelection('team_h')}
            >
              Select
            </button>
          </div>
          <div>
            <h2 className="font-bold md:text-xl truncate ...">Draw</h2>
            <p className="text-2xl md:text-4xl mt-2 mb-2">-</p>
            <button
              className={`${
                gameBet?.winner === 'draw' ? 'bg-green-500' : 'bg-gray-300'
              } text-white font-bold py-2 px-4 mx-1 rounded`}
              onClick={() => handleWinnerSelection('draw')}
            >
              Select
            </button>
          </div>
          <div>
            <h2 className="font-bold md:text-xl truncate ...">{fixture.team_a}</h2>
            <p className="text-2xl md:text-4xl mt-2 mb-2">{fixture.team_a_score}</p>
            <button
              className={`${
                gameBet?.winner === 'team_a' ? 'bg-green-500' : 'bg-gray-300'
              } text-white font-bold py-2 px-4 mx-1 rounded`}
              onClick={() => handleWinnerSelection('team_a')}
            >
              Select
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3  text-center border-b-2 border-gray-300">
            <div>
            <div className="font-bold mb-3">
                <input min="0" 
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="goalsH"
                
                value={gameBet?.goalsH || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="shotsH"
                value={gameBet?.shotsH || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="shotsOnGoalH"
                value={gameBet?.shotsOnGoalH || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="yellowCardsH"
                value={gameBet?.yellowCardsH || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="redCardsH"
                value={gameBet?.redCardsH || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="cornersH"
                value={gameBet?.cornersH || ''}
                onChange={handleInputChange}
                />
            </div>
            
            </div>
            <div>
            <h3 className='truncate ... lg:font-bold mb-4'>Goals</h3>
            <h3 className='truncate ... lg:font-bold mb-4'>Shots</h3>
            <h3 className='truncate ... lg:font-bold mb-4'>Shots on Goal</h3>
            <h3 className='truncate ... lg:font-bold mb-4'>Yellow Cards</h3>
            <h3 className='truncate ... lg:font-bold mb-4'>Red Cards</h3>
            <h3 className='truncate ... lg:font-bold mb-4'>Corners</h3>
            </div>
            <div>
            <div className="font-bold mb-3 ">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="goalsA"
                value={gameBet?.goalsA || ''}
                onChange={handleInputChange}
                />
            </div>
            
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="shotsA"
                value={gameBet?.shotsA || ''}
                onChange={handleInputChange}
                />
            </div>
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="shotsOnGoalA"
                value={gameBet?.shotsOnGoalA || ''}
                onChange={handleInputChange}
                />
            </div>
           
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="yellowCardsA"
                value={gameBet?.yellowCardsA || ''}
                onChange={handleInputChange}
                />
            </div>
            
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="redCardsA"
                value={gameBet?.redCardsA || ''}
                onChange={handleInputChange}
                />
            </div>
            
            
            <div className="font-bold mb-3">
                <input min="0"
                className='w-16 pl-2 border-2 border-gray-400 rounded-md'
                type="number"
                name="cornersA"
                value={gameBet?.cornersA || ''}
                onChange={handleInputChange}
                />
            </div>
            </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handlePlaceBet}
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchBettingView;
