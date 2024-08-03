import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../Components/Heading/Heading';
import { useAuth } from '../../Context/AuthContext';

const Blog = () => {

    const { blogs } = useAuth();

    return (
        <div>
            <Heading name1="Our Blogs" name2="Blog" />

            <section className="blogs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full mt-8">
                    {blogs.map((post, index) => (
                        <div className="shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] overflow-hidden" key={index}>
                            <div className="h-[30rem] w-full bg-cover bg-center bg-no-repeat hover:scale-105 overflow-hidden" style={{ backgroundImage: `url(${post.image})` }}></div>
                            <div className="px-8 py-6">
                                <div className="border-2 border-white border-b-[#a8a297] border-solid pb-[1.7rem] mb-[1.7rem] flex justify-between items-center">
                                    <Link to="#" className="text-2xl text-[#ff9421]  hover:text-[#cf1a1a]"><i className="fas fa-calendar text-[#cf1a1a]"></i> {post.date} </Link>
                                    <Link to="#" className="text-2xl text-[#ff9421] hover:text-[#cf1a1a] "><i className="fas fa-user text-[#cf1a1a]"></i> by {post.author} </Link>
                                </div>
                                <h3 className="text-[2rem] text-black font-normal">{post.title}</h3>
                                <p className="text-lg color-black normal-case text-justify py-4 overflow-hidden hover:overflow-auto">{post.description}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blog;
