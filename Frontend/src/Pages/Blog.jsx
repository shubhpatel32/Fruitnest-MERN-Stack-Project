import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Components/Heading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/blog/data`, {
                method: "GET",
            })

            if (response.ok) {
                const blogs = await response.json();
                console.log("blogs:", blogs);
                setBlogs(blogs);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])

    return (
        <div className='min-h-screen'>
            <Heading name1="Our Blogs" name2="Blog" />

            <section className="blogs">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8'>
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] overflow-hidden">
                                <Skeleton height={300} width="100%" />
                                <div className="px-8 py-6">
                                    <div className="border-2 border-white border-b-[#a8a297] border-solid pb-[1.7rem] mb-[1.7rem] flex justify-between items-center">
                                        <Skeleton width={100} height={20} />
                                        <Skeleton width={100} height={20} />
                                    </div>
                                    <Skeleton height={30} width="80%" />
                                    <Skeleton count={3} height={20} className="my-4" />
                                </div>
                            </div>
                        ))
                    ) : (
                        blogs.map((blogPost, index) => (
                            <div key={index} className="shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] overflow-hidden rounded-lg">
                                <img src={blogPost.image} alt="Gallery" className="h-[30rem] w-full object-cover hover:scale-105" />
                                <div className="px-8 py-6">
                                    <div className="border-2 border-white border-b-[#a8a297] border-solid pb-[1.7rem] mb-[1.7rem] flex justify-between items-center">
                                        <Link to="#" className="text-2xl text-[#ff9421] hover:text-[#cf1a1a]">
                                            <i className="fas fa-calendar text-[#cf1a1a]"></i> {blogPost.date}
                                        </Link>
                                        <Link to="#" className="text-2xl text-[#ff9421] hover:text-[#cf1a1a]">
                                            <i className="fas fa-user text-[#cf1a1a]"></i> by {blogPost.author}
                                        </Link>
                                    </div>
                                    <h3 className="text-[2rem] text-black font-normal">{blogPost.title}</h3>
                                    <p className="text-lg color-black normal-case text-justify py-4 overflow-hidden hover:overflow-auto">
                                        {blogPost.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
