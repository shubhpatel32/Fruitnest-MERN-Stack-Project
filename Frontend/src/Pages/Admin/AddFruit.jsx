import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AddFruit = () => {
    const navigate = useNavigate();
    const { authorizationToken } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [fruit, setFruit] = useState({
        name: '',
        price: '',
        discount: '',
        stock: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFruit(prev => ({ ...prev, image: files[0] }));
        } else {
            setFruit(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', fruit.name);
        formData.append('price', fruit.price);
        formData.append('discount', fruit.discount);
        formData.append('stock', fruit.stock);
        if (fruit.image) {
            formData.append('image', fruit.image);
        }

        try {
            const response = await fetch(`${apiUrl}/admin/fruits/add`, {
                method: "POST",
                headers: {
                    Authorization: authorizationToken
                },
                body: formData
            });

            if (response.ok) {
                toast.success("Fruit added successfully");
                navigate("/admin/fruits");
            } else {
                toast.error("Error adding fruit");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding fruit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Add New Item</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={fruit.name}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        value={fruit.price}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block font-medium mb-1">Discount</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        required
                        value={fruit.discount}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block font-medium mb-1">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        required
                        value={fruit.stock}
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

export default AddFruit;
