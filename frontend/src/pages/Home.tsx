import React, { useEffect } from 'react';
import TableStandings from '../components/TableStandings';
import GameweekFixtures from '../components/GameweekFixtures';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";



interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (auth.currentUser === null) {
        navigate("/");
    }
    }, []);
    return (
        
        <div className='h-3/4 w-3/4 mx-auto items-start grid lg:grid-cols-[3fr,3fr] sm:grid-cols-[2fr,2fr] md:gap-2 '>
            <div className='items-center justify-center my-auto gap-6 grid grid-row-[1fr,1fr]'>
                
                <GameweekFixtures week={1}/>
                <GameweekFixtures week={2}/>
            </div>
            <TableStandings /> 
        </div>
    );
};


export default Home;