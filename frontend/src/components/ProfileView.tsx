import React, { useState, useEffect } from 'react'; // add useEffect import
import { UserData } from '../types';
import { teams } from '../constants';
import { updateUserData, addFriend } from '../api/users';

interface ProfileViewProps {
    userData?: UserData,
    isCurrentUser?: boolean,
}

const ProfileView: React.FC<ProfileViewProps> = ({userData, isCurrentUser}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isFriendAdded, setIsFriendAdded] = useState<boolean>(false); 

    const [editedUsername, setEditedUsername] = useState(userData?.username || "");
    const [editedFavouriteTeam, setEditedFavouriteTeam] = useState(userData?.favouriteTeam || "");

    useEffect(() => { // listen for changes in userData and update local state accordingly
        setEditedUsername(userData?.username || "");
        setEditedFavouriteTeam(userData?.favouriteTeam || "");
    }, [userData]);

    const handleSave = async () => {
        setIsSaving(true);
        const updatedUser = await updateUserData({
            username: editedUsername,
            favouriteTeam: editedFavouriteTeam,
        });

        if(!updatedUser){
            console.log("Fel när användaren skulle byta");
        }

        setIsEditing(false);
        setIsSaving(false);
    };
    const handleAddFriend = async () => {
        setIsAdding(true);
        const result = await addFriend(userData?.email || '');
        if(result){
            setIsFriendAdded(true); // Update state if friend addition is successful
        }
        setIsAdding(false);
    };

    return (
        <div className='w-full lg:max-w-lg mx-auto  justify-center p-4 bg-white rounded-lg grid grid-cols-1 gap-y-4'>
            <div className='text-center text-black text-md my-3 grid grid-rows-2'>
                <div>Username:</div>
                {isEditing 
                    ? <input className='mx-auto text-black p-1 border-2 border-gray-500 rounded-md' type="text" value={editedUsername} placeholder={userData?.username || "Change username"} onChange={(e) => setEditedUsername(e.target.value)} /> 
                    : editedUsername // change to display local state
                }
            </div>
            <div className='text-black grid grid-rows-2'>
                <div>Favourite Team:</div>
                {isEditing 
                    ? ( <div>
                        <select className='px-3 py-1 border-2 border-gray-500 rounded-md my-1' value={editedFavouriteTeam} onChange={(e) => setEditedFavouriteTeam(e.target.value)}>
                            {teams.map((team) => (
                                <option className='text-sm font-light'key={team} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>
                        </div>
                    ) 
                    : editedFavouriteTeam // change to display local state
                }
            </div>

            {isCurrentUser && (
                <div>
                    {isEditing 
                        ? <button disabled={isSaving} className="mt-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>Save</button>
                        : <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                    }
                </div>
            )}
            {!isCurrentUser && !isFriendAdded && (
                <div>
                    <button disabled={isAdding} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddFriend}>
                    Add Friend
                    </button>
                </div>
            )}
            {!isCurrentUser && isFriendAdded && (
                <div className="mt-2 text-green-500">
                    Friend added!
                </div>
            )}
        </div> 
    )
}

export default ProfileView;
