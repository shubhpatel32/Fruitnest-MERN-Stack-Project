import React from 'react';
import { Link } from 'react-router-dom';
// import './Banner.css';

function Banner() {
    const banners = [
        {
            image: 'Images/apple.jpg',
            title: 'Apple',
            discount: 'Upto 30% off',
            link: '/shop',
        },
        {
            image: 'Images/orange.jpg',
            title: 'Orange',
            discount: 'Upto 20% off',
            link: '/shop',
        },
        {
            image: 'Images/mango.jpeg',
            title: 'Mango',
            discount: 'Upto 15% off',
            link: '/shop',
        },
        {
            image: 'Images/banana.webp',
            title: 'Banana',
            discount: 'Upto 40% off',
            link: '/shop',
        },
        {
            image: 'Images/strawberry.jpg',
            title: 'Strawberry',
            discount: 'Upto 10% off',
            link: '/shop',
        },
        {
            image: 'Images/grapes.jpg',
            title: 'Grapes',
            discount: 'Upto 25% off',
            link: '/shop',
        },
    ];

    return (
        <div>

            <section className='deals'>
                <h1 className='text-center text-5xl text-[#ff9421] mt-12 font-bold'>Best <span className='text-[#cf1a1a]'>Deals</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8">
                    {banners.map((banner, index) => (
                        <div key={index} className="h-[300px] w-full flex flex-col justify-center rounded-lg py-5 pb-[15px] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
                            <div className="w-full h-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${banner.image})` }}></div>
                            <div className="text-center pt-6">
                                <h3 className="text-3xl font-semibold">{banner.title}</h3>
                                <h2 className="text-2xl font-normal mt-4">{banner.discount}</h2>
                                <Link to={banner.link} className="btn">Shop now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Banner;
