import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminUsers = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(users);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingUser, setEditingUser] = useState({ username: '', email: '', phone: '' });

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                users.filter((user) =>
                    user.email.startsWith(searchTerm.trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, users]);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

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
                setUsers(users.filter(user => user._id !== id));
                setFiltered(filtered.filter(user => user._id !== id));
                toast.success("User deleted successfully");
            } else {
                toast.error("Error in deleting user");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const startEditing = (user) => {
        setEditingUserId(user._id);
        setEditingUser({ username: user.username, email: user.email, phone: user.phone });
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setEditingUser({ username: '', email: '', phone: '' });
    };

    const saveChanges = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ username: editingUser.username, phone: editingUser.phone })
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success("User updated successfully");
                setUsers(users.map(user => (user._id === id ? { ...user, ...editingUser } : user)));
                setFiltered(filtered.map(user => (user._id === id ? { ...user, ...editingUser } : user)));
                cancelEditing();
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating user");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                    <i onClick={() => {
                        setFiltered(users);
                        setSearchTerm('')
                    }} className="fa fa-times flex items-center mr-4 text-gray-700 text-2xl"></i>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left w-[20%]">Username</th>
                            <th className="py-3 px-4 text-left w-[20%]">Email</th>
                            <th className="py-3 px-4 text-left w-[20%]">Phone</th>
                            <th className="py-3 px-4 text-left w-[15%]">Edit</th>
                            <th className="py-3 px-4 text-left w-[10%]">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(10)].map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4"><Skeleton height={20} width={150} /></td>
                                    <td className="py-3 px-4"><Skeleton height={20} width={200} /></td>
                                    <td className="py-3 px-4"><Skeleton height={20} width={100} /></td>
                                    <td className="py-3 px-4"><Skeleton height={30} width={50} /></td>
                                    <td className="py-3 px-4"><Skeleton height={30} width={50} /></td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((user, index) => (
                                <tr key={index} className="border border-solid h-[6rem]">
                                    <td className="py-3 px-4 normal-case">
                                        {editingUserId === user._id ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={editingUser.username}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400 normal-case"
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {user.email}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingUserId === user._id ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editingUser.phone}
                                                onChange={handleInputChange}
                                                className="p-1 rounded border border-solid border-gray-400 normal-case"
                                            />
                                        ) : (
                                            user.phone
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingUserId === user._id ? (
                                            <>
                                                <button
                                                    onClick={() => saveChanges(user._id)}
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
                                                onClick={() => startEditing(user)}
                                                className="py-1 px-4 rounded-lg bg-orange-400 text-white"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        <button onClick={() => deleteUser(user._id)} className='py-1 px-4 rounded-lg bg-red-500 text-white'>
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
}

export default AdminUsers;
