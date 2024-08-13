
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const EditFruit = () => {
    const { id } = useParams();
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [fruit, setFruit] = useState({
        name: '',
        price: '',
        discount: '',
        stock: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFruit = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/fruits/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                const data = await response.json();
                setFruit({
                    name: data.name,
                    price: data.price,
                    discount: data.discount,
                    stock: data.stock
                });
            } catch (error) {
                console.log(error);
                toast.error("Error fetching fruit details.");
            } finally {
                setLoading(false);
            }
        };

        getFruit();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFruit(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/admin/fruits/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(fruit)
            });
            if (response.ok) {
                toast.success("Fruit updated successfully");
                navigate("/admin/fruits");
            } else {
                toast.error("Error updating fruit");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating fruit");
        }
    };

    return (
        <div className="p-4 bg-white">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                    <h1 className="text-3xl text-center font-semibold mb-4">Edit Fruit</h1>
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
                    <button type="submit" className="btn text-white py-2 px-4 rounded">Update Fruit</button>
                </form>
            )}
        </div>
    );
};

export default EditFruit;
