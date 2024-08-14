import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
    const { authorizationToken } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(blogs);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                blogs.filter((blog) =>
                    blog.title.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, blogs]);

    const getAllBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/blogs`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/blogs/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getAllBlogs();
                toast.success("Blog deleted successfully");
            } else {
                toast.error("Error in deleting blog");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by Title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                    <i onClick={() => {
                        setFiltered(blogs);
                        setSearchTerm('')
                    }} className="fa fa-times flex items-center mr-4 text-gray-700 text-2xl cursor-pointer"></i>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className='bg-gray-400 border-b border-gray-700'>
                            <th className='py-3 px-4 text-left w-1/4'>Title</th>
                            <th className='py-3 px-4 text-left w-1/4'>Description</th>
                            <th className='py-3 px-4 text-left'>Image</th>
                            <th className='py-3 px-4 text-left'>Author</th>
                            <th className='py-3 px-4 text-left'>Date</th>
                            <th className="py-3 px-4 text-left">Edit</th>
                            <th className="py-3 px-4 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4"><Skeleton width={150} /></td>
                                    <td className="py-3 px-4"><Skeleton width={200} /></td>
                                    <td className="py-3 px-4"><Skeleton height={80} /></td>
                                    <td className="py-3 px-4"><Skeleton width={120} /></td>
                                    <td className="py-3 px-4"><Skeleton width={100} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((blog, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4 text-left normal-case">{blog.title}</td>
                                    <td className="py-3 px-4 text-left normal-case">{blog.description}</td>
                                    <td className="py-3 px-4">
                                        {blog.image && (

                                            <img src={`/${blog.image}`} alt="Blog" className="w-[10rem] h-[8rem] object-contain" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-left normal-case">{blog.author}</td>
                                    <td className="py-3 px-4 text-left normal-case">{blog.date}</td>
                                    <td className="py-3 px-4 normal-case"><Link to={`/admin/blogs/edit/${blog._id}`} className='py-1 px-4 rounded-lg bg-orange-400 text-white'>Edit</Link></td>

                                    <td className="py-3 px-4 normal-case"><button onClick={() => deleteBlog(blog._id)} className='py-1 px-4 rounded-lg bg-red-500 text-white'>Delete</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default AdminBlogs;