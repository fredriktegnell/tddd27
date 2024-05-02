import { getAuth } from 'firebase/auth'; // Import the Firebase auth object
const API_BASE_URL = "http://localhost:5001/api";

export const saveUser = async (firebaseUid: string, email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/saveUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseUid, email }),
    });
    
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

export const getUserByUid = async() => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user){
      throw new Error('User not authenticated');
    }
    
    // Retrieve token from the current user
    const idToken = await user.getIdToken();

    const response = await fetch(`${API_BASE_URL}/users/uid`, {
      headers: {
        'Authorization': `Bearer ${idToken}`,
      }
    });

    if(!response.ok){
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try { 
    const response = await fetch(`${API_BASE_URL}/users/username/${username}`);
    console.log(response)
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

export const updateUserData = async (newData: {username: string, favouriteTeam: string}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if(!user){
    throw new Error('User not authenticated')
  }
  const idToken = await user.getIdToken();

  const response = await fetch(`${API_BASE_URL}/users/uid`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify(newData),
  });

  if (!response.ok) {
      
      throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export const addFriend = async (friendEmail: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  console.log(user);
  console.log(friendEmail);
  const response = await fetch(`${API_BASE_URL}/users/add`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: user.uid, friendEmail: friendEmail }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const removeFriend = async (friendEmail: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const response = await fetch(`${API_BASE_URL}/users/remove`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ uid: user.uid, friendEmail }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};


export const getAllUsers = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if(!user) {
    throw new Error('User not authenticated')
  }
  const idToken = await user.getIdToken();
  const response = await fetch(`${API_BASE_URL}/users/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    }
  });
  
  console.log(response);
  if(!response) {
    throw new Error('Network response for all users was not ok');
  }
  const data = await response.json();
  console.log(data);
  return data;
}


  