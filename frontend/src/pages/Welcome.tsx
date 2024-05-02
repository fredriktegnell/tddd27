import React from 'react';
import { Link } from 'react-router-dom'


interface WelcomeProps {};

const Welcome: React.FC<WelcomeProps> = (props) => {
    return (
        <div className='min-h-screen w-full flex flex-col items-center text-center px-4'>
            <div className='max-w-2xl'>
            <h1 className="text-6xl font-bold text-white mb-4 mt-10">Welcome to Footy!</h1>
            <h2 className="text-2xl text-white mb-8 ">This is a hobby project which can be used to get a better perspective on the teams in the Barclays Premier League </h2>
            </div>
            <Link to="/signup">
            <button className="bg-gradient-to-r from-cyan-100 to-blue-200 py-2 px-6 rounded-lg">Get Started</button>
            </Link>
        </div>
    );
};

export default Welcome;