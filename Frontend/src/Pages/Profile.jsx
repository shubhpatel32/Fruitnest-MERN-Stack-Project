import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();



    return (
        <div className="p-4 bg-white pt-36 text-2xl">
            <div className="container mx-auto px-4 min-h-screen pt-8">
                <section className="bg-white rounded border border-solid border-[#a8a297] p-8 max-w-md mx-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">My Profile</h2>
                    <form className="flex flex-col">
                        <div className="mb-10">
                            <label htmlFor="username" className="block font-medium mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                readOnly
                                value={user.username}
                                className="p-2 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                            />
                        </div>
                        <div className="mb-10">
                            <label htmlFor="email" className="block font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
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
                                readOnly
                                value={user.phone}
                                className="p-2 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                            />
                        </div>


                        <div className="mt-4 text-center">
                            <Link
                                to="/profile/edit"
                                className="btn text-white py-2 px-4 rounded bg-[#ff9421]"
                            >
                                Edit
                            </Link>
                        </div>

                    </form>
                </section>
            </div>
        </div >
    );
};

export default Profile;
