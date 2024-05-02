import React, { useEffect, useState } from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/tailwind.css';
import { User } from 'firebase/auth';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Layout from './components/Layout';
import Fixtures from './pages/Fixtures';
import MatchView from './components/MatchView';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { signOutUser } from './utils/auth';
import BettingPage from './pages/BettingPage';
import MatchBettingView from './components/MatchBettingView';
import MyProfile from './pages/MyProfile';
import UserBets from './components/UserBets';
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [auth, user]);

  const handleSignOut = async () => {
    const success = await signOutUser();
    if (!success) {
      console.log("unsuccessful logout");
    } else {
      console.log("Successful logout!")
      
    }

  };
  

  return (
    <Router>
      <Layout onSignOut={handleSignOut} user={user}>
        <Routes>
          <Route path='/home' element={user ? <Home/> : <Navigate to='/' />} />
          <Route path="/" element={user ? <Navigate to='/home'/> : <Welcome/>} />
          <Route path="/fixtures" element={<Fixtures/>}/>
          <Route path="/fixtures/:week/:id" element={<MatchView />} />
          <Route path="/profile" element={<MyProfile/>}/>
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/betting" element={<BettingPage/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
