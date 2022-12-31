import React from 'react';
import Lottie from 'lottie-react';
import reader from '../../Lottite/cominsoon.json'
import Marquee from "react-fast-marquee";

const Home = () => {
    return (
        <div className='flex justify-center items-center'>
            <div>
                <Marquee>
                    <h1>Happ New Year 2023 !!!</h1>
                </Marquee>
            </div>
            <div className='w-fit' >
                <Lottie animationData={reader} loop={true} />
            </div>
        </div>
    );
};

export default Home;