import { Response, Request } from "express";
import { UserModel } from "../models/userModel";



export const saveUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const createdUser = await UserModel.create(userData);
        return res.json(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getUserByUid = async (req: Request, res: Response) => {
    try {
        const uid = req.body.uid;
        const userInfo = await UserModel.findOne({ firebaseUid: uid });

        if (userInfo) {
            let friendsUsernames: string[] = [];
            for (const friendId of userInfo.friends) {
                let friend = await UserModel.findOne({ _id: friendId });
                if (friend && friend.username) friendsUsernames.push(friend.username);
            }

            // Create a new object with properties that you want to send back in the response
            const userInfoResponse = {
                _id: userInfo._id,
                firebaseUid: userInfo.firebaseUid,
                email: userInfo.email,
                username: userInfo.username,
                favouriteTeam: userInfo.favouriteTeam,
                friends: friendsUsernames // use usernames instead of ids
            }

            return res.json(userInfoResponse);
        }

        return res.status(401).json({ message: 'User not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error, could not retrieve user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const uid = req.body.uid;
        const { username, favouriteTeam } = req.body;
        const updatedUser = await UserModel.findOneAndUpdate(
            { firebaseUid: uid },
            { username, favouriteTeam },
            { new: true } // this ensures that the function returns the updated document
        );
        return res.json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const userInfo = await UserModel.findOne({ username: username });

        if (userInfo) {
            let friendsUsernames: string[] = [];
            for (const friendId of userInfo.friends) {
                let friend = await UserModel.findOne({ _id: friendId });
                if (friend && friend.username) friendsUsernames.push(friend.username);
            }

            // Create a new object with properties that you want to send back in the response
            const userInfoResponse = {
                _id: userInfo._id,
                firebaseUid: userInfo.firebaseUid,
                email: userInfo.email,
                username: userInfo.username,
                favouriteTeam: userInfo.favouriteTeam,
                friends: friendsUsernames // use usernames instead of ids
            }

            return res.json(userInfoResponse);
        }

        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error, could not find user' });
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { uid, friendEmail } = req.body;
        const user = await UserModel.findOne({ firebaseUid: uid });
        const friend = await UserModel.findOne({ email: friendEmail });

        if (!user || !friend) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if users already are friends
        if (user.friends.includes(friend._id) || friend.friends.includes(user._id)) {
            return res.status(400).json({ error: 'Friend already added' });
        }

        // Add friend to user's friend list
        user.friends.push(friend._id);
        await user.save();

        // Add user to friend's friend list
        friend.friends.push(user._id);
        await friend.save();

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const removeFriend = async (req: Request, res: Response) => {
    try {
        const { uid, friendEmail } = req.body;
        const user = await UserModel.findOne({ firebaseUid: uid });
        const friend = await UserModel.findOne({ email: friendEmail });
        if (!user || !friend) {
            return res.status(404).json({ error: 'User not found' });
        }
        const friendIndex = user.friends.indexOf(friend._id);
        if (friendIndex === -1) {
            return res.status(400).json({ error: 'Friend not found' });
        }
        user.friends.splice(friendIndex, 1);
        await user.save();
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
       
        if(!users) {
            return res.status(404).json('Could not retrieve users from database');
        }
        const usernames = users.map((user) => user.username);
        return res.json(usernames)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error'})
    }
};
