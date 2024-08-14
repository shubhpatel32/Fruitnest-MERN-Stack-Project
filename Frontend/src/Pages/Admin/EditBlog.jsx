import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const EditBlog = () => {
    const { id } = useParams();
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [blog, setBlog] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/blogs/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken
                    }
                });
                const data = await response.json();
                setBlog({
                    title: data.title,
                    author: data.author,
                    description: data.description
                });
            } catch (error) {
                console.error('Error fetching blog:', error);
                toast.error("Error fetching blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, authorizationToken, apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/admin/blogs/update/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blog)
            });

            if (response.ok) {
                toast.success("Blog updated successfully");
                navigate("/admin/blogs");
            } else {
                toast.error("Error updating blog");
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error("Error updating blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white min-h-screen">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl justify-center items-center">
                    <h1 className="text-3xl text-center font-semibold mb-4">Edit Blog</h1>


                    <div className="mb-4 w-full">
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={blog.title}
                            onChange={handleChange}
                            className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="author" className="block font-medium mb-1">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            required
                            value={blog.author}
                            onChange={handleChange}
                            className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="description" className="block font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            value={blog.description}
                            onChange={handleChange}
                            className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case h-48"
                        />
                    </div>

                    <button type="submit" className="btn text-white py-2 px-4 rounded">Update Blog</button>

                </form>
            )}
        </div>
    );
};

export default EditBlog;
