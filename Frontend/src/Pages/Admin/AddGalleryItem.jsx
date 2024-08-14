import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AddGalleryItem = () => {
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${apiUrl}/admin/gallery/add`, {
                method: 'POST',
                headers: {
                    Authorization: authorizationToken
                },
                body: formData
            });

            if (response.ok) {
                toast.success('Gallery item added successfully');
                navigate('/admin/gallery');
            } else {
                toast.error('Error adding gallery item');
            }
        } catch (error) {
            console.error('Error adding gallery item:', error);
            toast.error('Error adding gallery item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Add Gallery Item</h1>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <button type="submit" className="btn text-white py-2 px-4 rounded" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Item'}
                </button>
            </form>
        </div>
    );
};

export default AddGalleryItem;
