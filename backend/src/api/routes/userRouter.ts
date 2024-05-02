import express from 'express';
import { getUserByUid, getUserByUsername, saveUser, updateUser, addFriend, removeFriend, getAllUsers } from '../controllers/userController';
import { checkFirebaseToken } from '../middleware/firebaseValidator';




const router = express.Router();

router.post('/saveUser', saveUser);
router.get('/uid', checkFirebaseToken,  getUserByUid);
router.get('/username/:username', getUserByUsername);
router.get('/all', checkFirebaseToken, getAllUsers);
router.put('/uid', checkFirebaseToken, updateUser);
router.put('/add', addFriend);
router.put('/remove', checkFirebaseToken, removeFriend);


export default router;
