import React from 'react';
import { Link } from 'react-router-dom';
// import './Banner.css';

function Banner({ image, title, discount, link }) {
    return (
        <div className="h-[300px] w-full flex flex-col justify-center rounded-lg py-5 pb-[15px] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
            <div className="w-full h-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="text-center pt-6">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <h2 className="text-2xl font-normal mt-4">{discount}</h2>
                <Link to={link} className="btn">Shop now</Link>
            </div>
        </div>
    );
}

export default Banner;
