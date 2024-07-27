import React from 'react';
import { Link } from 'react-router-dom';


const Newblogs = ({ image, date, title, author, description }) => {

    return (

        <div className="shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] overflow-hidden">
            <div className="h-[30rem] w-full bg-cover bg-center bg-no-repeat hover:scale-105 overflow-hidden " style={{ backgroundImage: `url(${image})` }}></div>
            <div className="px-8 py-6">
                <div className=" border-2 border-white border-b-[#a8a297] border-solid pb-[1.7rem] mb-[1.7rem] flex justify-between items-center">
                    <Link to="#" className="text-2xl text-[#ff9421]  hover:text-[#cf1a1a]"><i className="fas fa-calendar text-[#cf1a1a]"></i> {date} </Link>
                    <Link to="#" className="text-2xl text-[#ff9421] hover:text-[#cf1a1a] "><i className="fas fa-user text-[#cf1a1a]"></i> by {author} </Link>
                </div>
                <h3 className="text-[2rem] text-black font-normal">{title}</h3>
                <p className="text-lg color-black normal-case text-justify py-4 ">{description}</p>
            </div>
        </div>

    );
};

export default Newblogs;
