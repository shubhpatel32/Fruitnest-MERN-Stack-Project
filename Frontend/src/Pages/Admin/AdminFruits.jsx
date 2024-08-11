import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AdminFruits = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [fruits, setFruits] = useState([]);

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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Discount</th>
                            <th className="py-3 px-4 text-left">Edit</th>
                            <th className="py-3 px-4 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fruits.map((fruit, index) => (
                            <tr key={index} className="border border-solid">
                                <td className="py-3 px-4">
                                    <div className="w-[5rem] h-[5rem] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/${fruit.image})` }}></div>
                                </td>
                                <td className="py-3 px-4 normal-case">{fruit.name}</td>
                                <td className="py-3 px-4 normal-case">&#8377;{fruit.price}</td>
                                <td className="py-3 px-4 normal-case">{fruit.discount}%</td>
                                <td className="py-3 px-4 normal-case"><button className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Edit</button></td>
                                <td className="py-3 px-4 normal-case"><button onClick={() => deleteFruit(fruit._id)} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminFruits;
