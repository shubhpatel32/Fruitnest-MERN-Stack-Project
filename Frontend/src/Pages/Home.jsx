import React from 'react';
import Slideshow from './Slideshow';
import Banner from './Banner';
import Newblogs from './Newblogs';


function Home() {

    return (
        <div className="home min-h-screen">
            <Slideshow />
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6 shadow-md mt-20"></div>
            <Banner />
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6 shadow-md mt-8"></div>
            <Newblogs />
        </div>
    );
}

export default Home;
