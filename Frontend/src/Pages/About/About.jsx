import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import { useAuth } from '../../Context/AuthContext'


function About() {
    const [gallery, setGallery] = useState([]);
    const { user } = useAuth();


    const getGallery = async () => {
        try {
            const response = await fetch("https://fruitnest-backend.vercel.app/api/gallery/data", {
                method: "GET",
            })

            if (response.ok) {
                const gallery = await response.json();
                console.log("gallery:", gallery);
                setGallery(gallery);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const myGallery = gallery.slice(0, 6);

    useEffect(() => {
        getGallery();
    }, [])

    return (
        <div className='min-h-screen'>
            <Heading name1="About Us" name2="About" />

            <section className="about">
                <div className="w-full my-4" >
                    <h1 className="text-[#cf1a1a] text-[3rem] font-semibold text-center">Welcome to our shop</h1>
                    <h3 className="text-[#ff9421] text-[2.3rem] font-semibold text-center">Fresh & Organic Fruits</h3>
                    <p className="text-black text-justify text-2xl my-4">
                        {user ? `Hey ${user.username},` : ""} Welcome to Fruit Nest, your ultimate online destination dedicated to bringing you the finest selection of fruits from around the world. At Fruit Nest, we're passionate about ensuring every fruit you receive is not only delicious but also of the highest quality. Our commitment begins with partnering directly with trusted farmers who share our values of sustainability and ethical farming practices. This direct relationship allows us to carefully handpick each fruit at its peak ripeness, ensuring optimal flavor and nutrition.


                    </p>
                    <p className="text-black text-justify text-2xl mb-4">
                        Fruit Nest is more than just a marketplace; it's a community of fruit enthusiasts and health-conscious individuals who value wholesome living. We believe that enjoying fresh fruits should be both a pleasure and a source of nourishment. From the juicy sweetness of California strawberries to the exotic allure of Costa Rican pineapples, each fruit in our selection tells a story of its origin and journey to your table.
                    </p>

                    <p className="text-black text-justify text-2xl mb-4">
                        Our platform not only offers convenience but also empowers you to make informed choices about what you consume. We strive to provide transparency in our sourcing, ensuring that every fruit meets rigorous quality standards before it reaches your doorstep. Whether you're looking for everyday fruits for your family or exotic varieties to explore new flavors, Fruit Nest is here to cater to your cravings and culinary adventures.
                    </p>
                    <p className="text-black text-justify text-2xl mb-4">
                        Fruits are nature's nutritional powerhouses, packed with essential vitamins, minerals, and antioxidants that are vital for overall health and well-being. From vitamin C in citrus fruits that boosts immune function to potassium in bananas that supports heart health, each fruit offers a unique combination of nutrients. These nutrients not only help to maintain proper bodily functions but also play a crucial role in preventing chronic diseases such as heart disease, diabetes, and certain cancers. Regular consumption of fruits as part of a balanced diet can contribute significantly to maintaining optimal health throughout life.
                    </p>
                    <p className="text-black text-justify text-2xl mb-4">
                        Join us on this flavorful journey where health meets taste, and discover why Fruit Nest is your trusted partner in bringing nature's goodness right to your home.
                    </p>

                </div >
            </section >

            <section className="gallery">
                <h1 className='text-center text-5xl my-8 font-bold text-[#ff9421]'>Our <span className='text-[#cf1a1a]'>Gallery</span></h1>
                <div className="h-full w-full grid md:grid-cols-2 grid-cols-1 gap-10 justify-center overflow-hidden">
                    {myGallery.map((item, index) => (
                        <div key={index} className="box bg-center bg-cover bg-no-repeat h-[50rem] overflow-hidden w-full hover:scale-105" style={{ backgroundImage: `url(${item.url})` }}></div>
                    ))}

                </div>
            </section>

        </div >
    )
}

export default About
