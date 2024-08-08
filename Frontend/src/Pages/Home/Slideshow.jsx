import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Slideshow() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [gallery, setGallery] = useState([]);
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


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         nextSlide();
    //     }, 3000);

    //     return () => clearTimeout(timer);
    // }, [currentIndex]);

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getGallery = async () => {
        try {
            const response = await fetch(`${apiUrl}/gallery/data`, {
                method: "GET",
            })

            if (response.ok) {
                const gallery = await response.json();
                setGallery(gallery);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGallery();
    }, [])

    const s = gallery.slice(0, 5);

    const slides = [];
    for (let slide of s) {
        slides.push(slide["path"]);
    }
    [slides[0], slides[3]] = [slides[3], slides[0]]

    return (
        <div className=' h-[500px] md:min-h-screen w-screen m-auto pt-28 md:pt-32 px-4 md:px-12 relative group transition ease-in-out duration-300'>
            <div
                style={{ backgroundImage: `url(${(slides[currentIndex])})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-200'
            ></div>

            <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] left-5 md:left-14 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] right-5 md:right-14 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Slideshow;