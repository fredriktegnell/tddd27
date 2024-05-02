import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../utils/auth';
import { saveUser } from '../api/users';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(password !== repeatPassword) {
            // Show an error message
            alert('Passwords do not match');
            return;
        }

    

        const user = await signUp(email, password);
        if (user) {
            console.log("Signup successful");
            try {
                await saveUser(user.uid, email);
                navigate('/home');
            } catch (error) {
                console.error('Error when saving user to backend:', error);
            }
        } else {
            alert("Error when trying to sign up")
        }
    };

  return (
    <div className="flex justify-center ">
      <div className="bg-white rounded-lg shadow-md p-2 md:p-10 sm:w-1/2  lg:w-1/4 ">
        <h2 className='text-xl p-4 mx-auto justify-center text-center'>Register here!</h2>
        <form className='grid grid-cols-1 gap-y-3 p-2' onSubmit={handleSubmit}>
            <input className='border-2 px-1 text-sm font-light lg:text-base rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500' type="email" value={email} placeholder={"Email"} onChange={e => setEmail(e.target.value)} required />
            <input className='border-2 px-1 text-sm font-light lg:text-base rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500' type="password" value={password} placeholder={"Password"} onChange={e => setPassword(e.target.value)} required />
            <input className='border-2 px-1 text-sm font-light lg:text-base rounded-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500' type="password" value={repeatPassword} placeholder={"Repeat Password"} onChange={e => setRepeatPassword(e.target.value)} required />
            <button className="w-32 mx-auto mt-2 border-2 border-[#273336]  py-2 px-4 font-semibold rounded-lg " type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
