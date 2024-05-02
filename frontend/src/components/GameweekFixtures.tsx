import React, { useState, useEffect } from "react";
import { Gameweek } from "../types";
import { fetchFutureGameweek, fetchGameweek } from "../api/results";
import { Link } from "react-router-dom";
import SingleFixture from "./SingleFixture";

interface GameweekFixturesProps {
  week?: number;
  future?: boolean | undefined;
  multiple?: boolean | undefined;
  onCurrentGameweekChange?: (gameweek: number | undefined) => void;
  bettingPage?: boolean;
  setSelectedFixture?: (fixture: Gameweek) => void;
}

const GameweekFixtures: React.FC<GameweekFixturesProps> = ({
  week,
  future,
  multiple,
  onCurrentGameweekChange,
  bettingPage,
  setSelectedFixture,
}) => {
  const [gameweekFixtures, setGameweekFixtures] = useState<Gameweek[]>([]);
  const [currentGameweek, setCurrentGameweek] = useState<number | undefined>(
    week
  );
  
  const groupFixturesByGameweek = (fixtures: Gameweek[]) => {
    return fixtures.reduce((accumulator: { [key: number]: Gameweek[] }, fixture) => {
      if (accumulator[fixture.event]) {
        accumulator[fixture.event].push(fixture);
      } else {
        accumulator[fixture.event] = [fixture];
      }
      return accumulator;
    }, {});
  };

  useEffect(() => {
    const fetchData = async () => {
      if (future) {
        const data = await fetchFutureGameweek();
        if (data.length > 0) {
          const firstEvent = data[0].event;
          const filteredEvents = data.filter((game: Gameweek) => game.event === firstEvent);
          if (multiple) {
            setGameweekFixtures(data);
          } else {
            setGameweekFixtures(filteredEvents);
          }
          setCurrentGameweek(firstEvent - 1);
          if (onCurrentGameweekChange) {
            onCurrentGameweekChange(firstEvent - 1);
          }
        } else {
          const data = await fetchGameweek(38);
          setGameweekFixtures(data);
          setCurrentGameweek(38);

          if (onCurrentGameweekChange) {
            onCurrentGameweekChange(38 - 1)
          }}
      } else {
        if (week !== undefined) {
          const data = await fetchGameweek(week);
          setGameweekFixtures(data);
        } else {
          setGameweekFixtures([]);
        }
      }
    };
    fetchData();
  }, [currentGameweek, week]);

  const handleFixtureClick = (fixture: Gameweek) => {
    if (setSelectedFixture) {
      setSelectedFixture(fixture);
    }
  };

  return (
    <div className="mb-0">
      {multiple ? (
        Object.entries(groupFixturesByGameweek(gameweekFixtures)).map(
          ([event, fixtures]) => (
            <div key={event}>
              <div className="mb-1 text-center justify-center items-center text-white">
                {`Gameweek ${event}`}
              </div>
              <div className="w-full items-center justify-center grid md:grid-cols-[1fr,1fr] grid-cols gap-1">
                {fixtures.map((fixture, index) =>
                  bettingPage ? (
                    <div
                      key={index}
                      className="bg-gray-100 p-1 my-1 mx-1 rounded-md items-center text-left relative cursor-pointer"
                      onClick={() => handleFixtureClick(fixture)}
                    >
                      <SingleFixture fixture={fixture} />
                    </div>
                  ) : (
                    <Link
                      to={`/fixtures/${event}/${fixture.id}`}
                      key={index}
                    >
                      <div className="bg-gray-100 p-1 my-1 mx-1 rounded-md items-center text-left relative">
                        <SingleFixture fixture={fixture} />
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          )
        )
      ) : (
        <>
          <div className="mb-1 text-center justify-center items-center text-white">
            {future
              ? gameweekFixtures.length > 0
                ? `Gameweek ${gameweekFixtures[0].event}`
                : "Loading upcoming fixtures..."
              : `Gameweek ${week}`}
          </div>
          <div className="w-full items-center justify-center grid md:grid-cols-[1fr,1fr] grid-cols gap-1">
            {gameweekFixtures.map((fixture, index) =>
              bettingPage ? (
                <div
                  key={index}
                  className="bg-gray-100 p-1 my-1 mx-1 rounded-md items-center text-left relative"
                  onClick={() => handleFixtureClick(fixture)}
                >
                  <SingleFixture fixture={fixture} />
                </div>
              ) : (
                <Link
                  to={`/fixtures/${future ? gameweekFixtures[0].event : week}/${fixture.id}`}
                  key={index}
                >
                  <div className="bg-gray-100 p-1 my-1 mx-1 rounded-md items-center text-left relative">
                    <SingleFixture fixture={fixture} />
                  </div>
                </Link>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameweekFixtures;
