import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Banner() {
    const { shopItems } = useCart();
    const banners = shopItems.filter(item => item.discount);
    const loading = shopItems.length === 0;
    return (
        <div>
            <section className='deals'>
                <h1 className='text-center text-5xl text-[#ff9421] mt-12 font-bold'>
                    Best <span className='text-[#cf1a1a]'>Deals</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-[300px] w-full flex flex-col justify-center rounded-lg py-5 pb-[15px] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297]">
                                <Skeleton height={160} className="w-full" />
                                <div className="text-center pt-6">
                                    <Skeleton height={30} />
                                    <Skeleton height={30} className="mt-4" />
                                    <Skeleton height={40} width={120} className="mt-4 mx-auto" />
                                </div>
                            </div>
                        ))
                    ) : (
                        banners.map((banner, index) => (
                            <div key={index} className="h-[300px] w-full flex flex-col justify-center rounded-lg py-5 pb-[15px] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
                                <img src={banner.image} alt="Banner" className="w-full h-[160px] object-contain" />
                                <div className="text-center pt-6">
                                    <h3 className="text-3xl font-semibold">{banner.name}</h3>
                                    <h2 className="text-2xl font-normal mt-4">Upto {banner.discount}% Off</h2>
                                    <Link to="/shop" className="btn">Shop now</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

export default Banner;
