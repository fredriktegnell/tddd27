import React, { useState } from 'react';
import GameweekFixtures from '../components/GameweekFixtures';
import MatchBettingView from '../components/MatchBettingView';
import { Gameweek } from '../types';

const BettingPage: React.FC = () => {
  const [selectedFixture, setSelectedFixture] = useState<Gameweek | null>(null);
  const [currentGameweek, setCurrentGameweek] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  

  const handleFixtureClick = (fixture: Gameweek) => {
    // Only change the state if the screen width is less than or equal to the lg breakpoint (1024px)
    if (window.matchMedia('(max-width: 1024px)').matches) {
      setSelectedFixture(fixture);
      setIsModalOpen(true);
      
    } else {
      setSelectedFixture(fixture);
    }
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
    setIsModalOpen(false);

  };

  const closeModal = () => {
    console.log(isModalOpen)
    setIsModalOpen(false);
  };

  const handleCurrentGameweekChange = (gameweek: number | undefined) => {
    setCurrentGameweek(gameweek);
  };

  return (
    <div className="w-3/4 grid lg:grid-cols-[1fr,1fr] gap-2 mx-auto justify-center items-center ">
      <div className="text-center rounded-lg">
        <h3 className="text-white">Upcoming games</h3>
        <GameweekFixtures
          future
          multiple
          onCurrentGameweekChange={handleCurrentGameweekChange}
          bettingPage={true}
          setSelectedFixture={handleFixtureClick}
        />
      </div>

      <div className="hidden lg:block text-center rounded-lg w-3/4 mx-auto">
        <h3 className="text-white mb-4">Selected game</h3>
        <MatchBettingView fixture={selectedFixture} openNotification={() => setIsNotificationOpen(true)} />
        {isNotificationOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="bg-white p-4 rounded shadow-lg max-w-md w-full z-50">
              <h3 className="text-center mb-4">Bet placed! You can view it under My Bets.</h3>
              <button onClick={closeNotification} className="text-white bg-blue-500 py-2 px-4 rounded w-full">Close</button>
            </div>
          </div>
        )}

        
      </div>

      {/* This modal will be displayed on smaller screens (below lg) */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 lg:hidden" />
          <div className="fixed inset-0 flex items-center justify-center lg:hidden">
            <div className="bg-white p-4 rounded shadow-lg max-w-lg w-9/10 md:w-3/4">
              <button onClick={closeModal} className="mb-4 text-right">Close</button>
              <MatchBettingView fixture={selectedFixture} openNotification={() => setIsNotificationOpen(true)}/>
              {isNotificationOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                  <div className="fixed inset-0 bg-black opacity-50" />
                  <div className="bg-white p-4 rounded shadow-lg max-w-md w-full z-50">
                    <h3 className="text-center mb-4">Bet placed! You can view it under My Bets.</h3>
                    <button onClick={closeNotification} className="text-white bg-blue-500 py-2 px-4 rounded w-full">Close</button>
                  </div>
                </div>
              )}

              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BettingPage;
