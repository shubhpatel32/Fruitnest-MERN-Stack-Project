import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AddBlog = () => {
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('description', formData.description);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await fetch(`${apiUrl}/admin/blogs/add`, {
                method: 'POST',
                headers: {
                    Authorization: authorizationToken
                },
                body: formDataToSend
            });

            if (response.ok) {
                toast.success("Blog added successfully");
                navigate("/admin/blogs");
            } else {
                toast.error("Error adding blog");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding blog");
        }
    };

    return (
        <div className="p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Add New Blog</h1>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block font-medium mb-1">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] bg-transparent"
                    />
                </div>
                <button type="submit" className="btn text-white py-2 px-4 rounded bg-[#ff9421]">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
