import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { user, authorizationToken, setUser } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/auth/user/update`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const res_data = await response.json();
            if (response.ok) {
                setUser(formData)
                toast.success("Profile updated successfully");
                navigate("/profile");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating profile");
        }
    };

    return (
        <div className="p-4 bg-white pt-36 text-2xl">
            <div className="container mx-auto px-4 min-h-screen pt-8">
                <section className="bg-white rounded border border-solid border-[#a8a297] p-8 max-w-md mx-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="mb-10">
                            <label htmlFor="username" className="block font-medium mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="p-2 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                            />
                        </div>
                        <div className="mb-10">
                            <label htmlFor="email" className="block font-medium mb-1 normal-case">Email <span className="text-sm">(Cannot be changed)</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="p-2 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                            />
                        </div>
                        <div className="mb-10">
                            <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="p-2 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="btn text-white py-2 px-4 rounded bg-[#ff9421]"
                            >
                                Save
                            </button>
                            <Link

                                to="/profile"
                                className="text-[1.7rem] text-white py-3 px-8 mt-4 rounded-md bg-gray-400 hover:bg-gray-500 ml-4"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </div >
    );
};

export default EditProfile;
