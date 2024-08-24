import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Slideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getGallery = async () => {
        try {
            const response = await fetch(`${apiUrl}/gallery/data`, {
                method: "GET",
            });

            if (response.ok) {
                const gallery = await response.json();
                setGallery(gallery);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGallery();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const s = gallery.slice(0, 5);
    const slides = s.map((slide) => slide["path"]);

    return (
        <div className='h-[500px] md:min-h-screen w-screen m-auto pt-28 md:pt-32 px-4 md:px-12 relative group'>
            <div className='relative w-full h-full overflow-hidden'>
                {loading ? (
                    <Skeleton height='100%' width='100%' />
                ) : (
                    slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Slide ${index}`}
                            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            loading="lazy"
                        />
                    ))
                )}
            </div>

            <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] left-5 md:left-14 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] right-5 md:right-14 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>

            <div className='flex top-4 justify-center py-2'>
                {slides.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-[#cf1a1a]' : 'text-black'}`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slideshow;
