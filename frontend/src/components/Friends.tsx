import React from 'react';
import { UserData } from '../types';
import { Link } from 'react-router-dom'

interface FriendsProps {
    userData: UserData | undefined;
}

const Friends: React.FC<FriendsProps> = ({ userData }) => {
    
    return (
        <div className='w-full lg:max-w-lg mx-auto text-black justify-center p-4 bg-white rounded-lg grid grid-cols-1 gap-y-4'>
            {userData && userData.friends && (
                userData.friends.map((friend, index) => (
                    <div key={index}>
                        <Link to={`/users/${friend}`}>
                            <p>{friend}</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default Friends;
