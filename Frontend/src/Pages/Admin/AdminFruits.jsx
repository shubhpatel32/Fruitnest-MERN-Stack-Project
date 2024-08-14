import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminFruits = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [fruits, setFruits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(fruits);
    const [editingFruitId, setEditingFruitId] = useState(null);
    const [editingFruit, setEditingFruit] = useState({});

    const getFruits = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/fruits`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setFruits(data);
            setFiltered(data);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching fruits.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                fruits.filter((item) =>
                    item.name.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, fruits]);

    useEffect(() => {
        getFruits();
    }, []);

    const deleteFruit = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this fruit?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/fruits/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if (response.ok) {
                toast.success("Fruit deleted successfully");
                setFruits(fruits.filter(fruit => fruit._id !== id));
                setFiltered(filtered.filter(fruit => fruit._id !== id));
            } else {
                toast.error("Error deleting fruit");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error deleting fruit");
        }
    };

    const startEditing = (fruit) => {
        setEditingFruitId(fruit._id);
        setEditingFruit(fruit);
    };

    const cancelEditing = () => {
        setEditingFruitId(null);
        setEditingFruit({});
    };

    const saveChanges = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/admin/fruits/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(editingFruit)
            });
            if (response.ok) {
                toast.success("Fruit updated successfully");
                setFruits(fruits.map(fruit => (fruit._id === id ? editingFruit : fruit)));
                setFiltered(filtered.map(fruit => (fruit._id === id ? editingFruit : fruit)));
                cancelEditing();
            } else {
                toast.error("Error updating fruit");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating fruit");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingFruit({ ...editingFruit, [name]: value });
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                    <i onClick={() => {
                        setFiltered(fruits);
                        setSearchTerm('')
                    }} className="fa fa-times flex items-center mr-4 text-gray-700 text-2xl cursor-pointer"></i>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left w-[15%]">Name</th>
                            <th className="py-3 px-4 text-left w-[15%]">Price</th>
                            <th className="py-3 px-4 text-left w-[15%]">Discount</th>
                            <th className="py-3 px-4 text-left w-[15%]">Stock</th>
                            <th className="py-3 px-4 text-left w-[15%]">Edit</th>
                            <th className="py-3 px-4 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4">
                                        <Skeleton width={80} height={80} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={150} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={100} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={50} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={50} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={60} />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <Skeleton width={60} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((fruit) => (
                                <tr key={fruit._id} className="border border-solid">
                                    <td className="py-3 px-4">
                                        <img src={`/${fruit.image}`} alt={fruit.name} className="w-[5rem] h-[5rem] object-contain" />
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingFruitId === fruit._id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingFruit.name}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400"
                                            />
                                        ) : (
                                            fruit.name
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingFruitId === fruit._id ? (
                                            <input
                                                type="number"
                                                name="price"
                                                value={editingFruit.price}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400"
                                            />
                                        ) : (
                                            `₹${fruit.price}`
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingFruitId === fruit._id ? (
                                            <input
                                                type="number"
                                                name="discount"
                                                value={editingFruit.discount}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400"
                                            />
                                        ) : (
                                            `${fruit.discount}%`
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingFruitId === fruit._id ? (
                                            <input
                                                type="number"
                                                name="stock"
                                                value={editingFruit.stock}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400"
                                            />
                                        ) : (
                                            `${fruit.stock} kg`
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingFruitId === fruit._id ? (
                                            <>
                                                <button
                                                    onClick={() => saveChanges(fruit._id)}
                                                    className="py-1 px-4 mr-2 rounded-lg bg-green-500 text-white"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="py-1 px-4 rounded-lg bg-gray-500 text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => startEditing(fruit)}
                                                className="py-1 px-4 rounded-lg bg-orange-400 text-white"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <button
                                            onClick={() => deleteFruit(fruit._id)}
                                            className="py-1 px-4 rounded-lg bg-red-500 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFruits;
