import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                fruits.filter((fruit) =>
                    fruit.name.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, fruits]);

    const getAllFruits = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/fruits`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFruits(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFruit = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this fruit?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/fruits/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getAllFruits();
                toast.success("Fruit deleted successfully");
            } else {
                toast.error("Error in deleting fruit");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllFruits();
    }, []);

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
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Discount</th>
                            <th className="py-3 px-4 text-left">Stock</th>
                            <th className="py-3 px-4 text-left">Edit</th>
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
                            filtered.map((fruit, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4">

                                        <img src={`/${fruit.image}`} alt={fruit.name} className="w-[5rem] h-[5rem] object-contain" />
                                    </td>
                                    <td className="py-3 px-4 normal-case">{fruit.name}</td>
                                    <td className="py-3 px-4 normal-case">&#8377;{fruit.price}</td>
                                    <td className="py-3 px-4 normal-case">{fruit.discount}%</td>
                                    <td className="py-3 px-4 normal-case">{fruit.stock} kg</td>
                                    <td className="py-3 px-4 normal-case">
                                        <button className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Edit</button>
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <button onClick={() => deleteFruit(fruit._id)} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminFruits;
