import React from 'react';
import Slideshow from './Slideshow';
import Banner from './Banner';
import Newblogs from './Newblogs';


function Home() {

    return (
        <div className="home min-h-screen">
            <Slideshow />
            <Banner />
            <Newblogs />
        </div>
    );
}

export default Home;
