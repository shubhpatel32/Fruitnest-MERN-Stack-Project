import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if (response.ok) {
                getAllUsers();
                toast.success("User deleted successfully")
            }
            else {
                toast.error("Error in deleting user")
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="p-4 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left ">Username</th>
                            <th className="py-3 px-4 text-left ">Email</th>
                            <th className="py-3 px-4 text-left ">Phone</th>
                            <th className="py-3 px-4 text-left ">Edit</th>
                            <th className="py-3 px-4 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border border-solid">
                                <td className="py-3 px-4 normal-case">{user.username}</td>
                                <td className="py-3 px-4 normal-case">{user.email}</td>
                                <td className="py-3 px-4 normal-case">{user.phone}</td>
                                <td className="py-3 px-4 normal-case"><Link to={`/admin/users/${user._id}/edit`} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Edit</Link></td>
                                <td className="py-3 px-4 normal-case"><button onClick={() => deleteUser(user._id)} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUsers;
