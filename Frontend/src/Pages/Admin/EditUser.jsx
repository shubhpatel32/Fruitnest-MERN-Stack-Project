import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { id } = useParams();
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });
                const data = await response.json();
                setUser({
                    username: data.username,
                    email: data.email,
                    phone: data.phone
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [id, authorizationToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(user)
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success("User updated successfully");
                navigate("/admin/users");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating user");
        }
    };

    return (
        <div className="p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Edit User</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={user.username}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full  rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        readOnly
                        className="p-2 mb-7 w-full  rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        value={user.phone}
                        onChange={handleChange}
                        className="p-2 mb-7 w-full  rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                    />
                </div>
                <button type="submit" className="btn text-white py-2 px-4 rounded">Update User</button>
            </form>

        </div>
    );
};

export default EditUser;
