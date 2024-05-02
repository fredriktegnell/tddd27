import React, { useState, useEffect } from 'react';
import { getUserByUid } from '../api/users';
import { getGameBetsByUid } from '../api/gameBets';
import { UserData, GameBet } from '../types';
import ProfileView from '../components/ProfileView';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/auth'; 
import UserBets from '../components/UserBets';
import Friends from '../components/Friends';

const MyProfile: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData>();
    const [userBets, setUserBets] = useState<GameBet[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const fetchData = async () => {
                    setLoading(true);
                    const data = await getUserByUid();
                    const bets = await getGameBetsByUid();
                    setUserData(data);
                    setUserBets(bets);
                    setLoading(false);
                }
                fetchData();
            } else {
                // User is signed out
                setUserData(undefined);
                setUserBets([]);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className='w-3/4 h-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-center justify-center'>
          {loading ? (
            <div className='loading-spinner'></div>
          ) : (
            <>
              <div className='text-white max-w-md w-full lg:w-3/4 mx-auto grid grid-cols-1 md:grid-flow-row-dense md:auto-rows-max'>
                <div className='md:row-start-1 md:row-end-4'>
                  <div>Your profile </div>
                  <ProfileView userData={userData} isCurrentUser={true}></ProfileView>
                  Your friends
                  <Friends userData={userData} />
                </div>
              </div>
              <div className='text-white max-w-md w-full lg:w-3/4 mx-auto'>Your bets
                {userBets.map((bet, index) => (
                  <div className='mb-2' key={index}>
                    <UserBets userBet={bet}></UserBets>
                  </div>
                ))}
              </div>
            </>)}
        </div>
      );
      
}

export default MyProfile;
