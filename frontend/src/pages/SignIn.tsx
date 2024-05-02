import React, { useState } from 'react';
import { signIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const success = await signIn(email, password);
        if (success) {
            console.log("Login successful");
            navigate('/home');

        } else {
            alert("Login unsuccessful")
            return <div className='text-xl'>Something went wrong</div>
        }
    };

    return (
        <div className="flex justify-center ">
        <div className="bg-white rounded-lg shadow-md p-2 md:p-10 w-2/3 md:w-1/2 lg:w-1/3 ">
            <h2 className='text-xl p-4 mx-auto justify-center text-center'>Welcome!</h2>
            <form className='grid grid-cols-1 gap-y-3 p-2' onSubmit={handleSubmit}>
                <input className='border-2 text-sm font-light lg:text-base  px-1 rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500' type="email" value={email} placeholder={"Email"} onChange={e => setEmail(e.target.value)} required />
                <input className='border-2 text-sm font-light lg:text-base px-1 rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500' type="password" value={password} placeholder={"Password"} onChange={e => setPassword(e.target.value)} required />
                <button className="w-32 mx-auto border-2 border-[#273336]  py-2 px-4 font-semibold rounded-lg " type="submit">Sign in</button>
            </form>
            <div className="text-center mt-4 grid grid-cols-1">
                <span className="text-gray-900">Don't have an account? </span>
                <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign up now!</Link>
            </div>
        </div>
        </div>
    );
};

export default SignIn;
