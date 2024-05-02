import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../api/users';
import { getGameBetsByUsername } from '../api/gameBets';
import { UserData, GameBet } from '../types';
import ProfileView from '../components/ProfileView';
import UserBets from '../components/UserBets';
import Friends from '../components/Friends';

const UserProfile: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData>();
    const [userBets, setUserBets] = useState<GameBet[]>([]);

    const { username } = useParams<{username: string}>();

    useEffect(() => {
        const fetchData = async () => {
            if(username){
                setLoading(true);
                const data = await getUserByUsername(username);
                const bets = await getGameBetsByUsername(username);
                setUserData(data);
                setUserBets(bets);
                setLoading(false);
                
                
            }
        }
        fetchData();
    }, [username]);

    return (
        <div className='w-3/4 h-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-center'>
            {loading ? (
                <div className='loading-spinner'></div>
            ) : (
                <>
                    <div className='text-white max-w-md w-full lg:w-3/4 mx-auto grid grid-cols-1 md:grid-flow-row-dense md:auto-rows-max'>
                        <div>{userData?.username}'s profile </div>
                        <ProfileView userData={userData} isCurrentUser={false}></ProfileView>
                        {userData?.username}'s friends
                        <Friends userData={userData} />
                    </div>
                    <div className='text-white max-w-md w-full lg:w-3/4 mx-auto'>{userData?.username}'s bets
                        {userBets.map((bet, index) => (
                            <div className=' mb-2   ' key={index}>
                                <UserBets userBet={bet}></UserBets>
                                
                            </div>
                        ))}
                
                    </div>
                </>)}

        </div>
    );
}

export default UserProfile;
