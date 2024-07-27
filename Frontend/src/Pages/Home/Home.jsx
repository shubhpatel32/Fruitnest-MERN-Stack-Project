import React from 'react';
import Slideshow from './Slideshow';
import Banner from './Banner';
import Newblogs from './Newblogs';


function Home() {
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

    const blogPosts = [
        {
            image: 'SliderImages/pears.jpg',
            date: '3rd May, 2023',
            author: 'Admin',
            title: 'The Crispness of Pears',
            description: 'Explore the crisp and refreshing flavor of pears, perfect for snacking or incorporating into recipes. Learn about the different varieties and their unique characteristics.',
            link: '#'
        },
        {
            image: 'SliderImages/banana.jpg',
            date: '31st May, 2024',
            author: 'Admin',
            title: 'Bananas: Nature\'s Energy Booster',
            description: 'Learn about the nutritional value and energy-boosting benefits of bananas. Bananas are an excellent choice for a quick and nutritious snack.',
            link: '#'
        },
        {
            image: 'SliderImages/grapes.jpg',
            date: '21st June, 2024',
            author: 'Admin',
            title: 'Grapes: Nature\'s Bite-Sized Snack',
            description: 'Delve into the world of grapes and their versatility as a snack and ingredient. Whether fresh or dried, grapes offer a burst of sweetness and a wealth of nutrients.',
            link: '#'
        },
    ];

    return (
        <div className="home">
            <Slideshow />
            <section className='deals'>
                <h1 className='text-center text-5xl text-[#ff9421] mt-12 font-bold'>Best <span className='text-[#cf1a1a]'>Deals</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8">
                    {banners.map((banner, index) => (
                        <Banner
                            key={index}
                            image={banner.image}
                            title={banner.title}
                            discount={banner.discount}
                            link={banner.link}
                        />
                    ))}
                </div>
            </section>

            <section className='blogs'>
                <h1 className='text-center text-5xl mt-8 font-bold text-[#ff9421]'>New <span className='text-[#cf1a1a]'>Blogs</span></h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8'>
                    {blogPosts.map((blogPost, index) => (
                        <Newblogs
                            key={index}
                            image={blogPost.image}
                            date={blogPost.date}
                            author={blogPost.author}
                            title={blogPost.title}
                            description={blogPost.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
