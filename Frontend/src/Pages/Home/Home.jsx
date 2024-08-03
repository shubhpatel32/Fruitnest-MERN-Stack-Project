import React from 'react';
import Slideshow from './Slideshow';
import Banner from './Banner';
import Newblogs from './Newblogs';


function Home() {

    return (
        <div className="home">
            <Slideshow />
            <Banner />
            <Newblogs />
        </div>
    );
}

export default Home;
