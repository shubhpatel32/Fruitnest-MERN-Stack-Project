import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Newblogs = () => {
    const [blogs, setBlogs] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/blog/data`, {
                method: "GET",
            })

            if (response.ok) {
                const blogs = await response.json();
                // console.log("blogs:", blogs);
                setBlogs(blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])
    const limitedBlogs = blogs.slice(0, 3);


    return (
        <div>

            <section className='blogs'>
                <h1 className='text-center text-5xl mt-8 font-bold text-[#ff9421]'>New <span className='text-[#cf1a1a]'>Blogs</span></h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8'>
                    {limitedBlogs.map((blogPost, index) => (
                        <div key={index} className="shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] overflow-hidden">
                            <img src={blogPost.image} alt="Gallery" className="h-[30rem] w-full object-cover hover:scale-105" />

                            <div className="px-8 py-6">
                                <div className=" border-2 border-white border-b-[#a8a297] border-solid pb-[1.7rem] mb-[1.7rem] flex justify-between items-center">
                                    <Link to="#" className="text-2xl text-[#ff9421]  hover:text-[#cf1a1a]"><i className="fas fa-calendar text-[#cf1a1a]"></i> {blogPost.date} </Link>
                                    <Link to="#" className="text-2xl text-[#ff9421] hover:text-[#cf1a1a] "><i className="fas fa-user text-[#cf1a1a]"></i> by {blogPost.author} </Link>
                                </div>
                                <h3 className="text-[2rem] text-black font-normal">{blogPost.title}</h3>
                                <p className="text-lg color-black normal-case text-justify py-4 overflow-hidden hover:overflow-auto">{blogPost.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Newblogs;
