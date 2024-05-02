import { ExtendedGameBet, GameBet } from "../types";
import { getAuth } from 'firebase/auth'; // Import the Firebase auth object

const API_BASE_URL = "http://localhost:5001/api";

export const saveGameBet = async (gameBet: GameBet) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { uid, email } = user;

    const existingGameBets = await getGameBetsByUid();
    const existingGameBet = existingGameBets.find(
      (bet: ExtendedGameBet) => bet.fixtureId === gameBet.fixtureId
    );

    if (existingGameBet) {
      return changeGameBet(gameBet);
    } else {
      // Include the uid and email in the request body
      const body = {
        ...gameBet,
        uid,
        email,
        fixtureId: gameBet.fixtureId,
      };
      console.log(gameBet.fixtureId);

      const response = await fetch(`${API_BASE_URL}/gamebets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const message = await response.text(); // Or response.json() if the server returns JSON
        throw new Error(`HTTP ${response.status} - ${message}`);
      }
      

      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const changeGameBet = async (gameBet: GameBet) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const { uid, email } = user;
      console.log(uid, email);
  
      // Include the uid and email in the request body
      const body = {
        ...gameBet,
        uid,
        email,
        fixtureId: gameBet.fixtureId,
      };
  
      const response = await fetch(`${API_BASE_URL}/gamebets/${gameBet.fixtureId}/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const message = await response.text(); // Or response.json() if the server returns JSON
        throw new Error(`HTTP ${response.status} - ${message}`);
      }
      
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};
  

export const getGameBetsByUid = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(`${API_BASE_URL}/gamebets/uid/${user.uid}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getGameBetsByEmail = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gamebets/email/${email}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getGameBetsByUsername = async (username: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gamebets/username/${username}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
