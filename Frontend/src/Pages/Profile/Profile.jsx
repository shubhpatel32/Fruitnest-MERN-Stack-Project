import React from 'react';
import Heading from '../../Components/Heading/Heading';
import { useAuth } from '../../Context/AuthContext';

export const Profile = () => {
    const { user } = useAuth();

    return (
        <div>
            <Heading name1="My Profile" name2="Profile" />
            <section className="signup px-5 py-10 flex items-center justify-center text-2xl w-full">
                <form className="signup-form m-4 p-12 flex flex-col rounded border border-solid border-[#a8a297]">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        value={user?.username || ''}
                        readOnly
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        value={user?.email || ''}
                        readOnly
                    />
                    <label htmlFor="phone">Phone No.</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        required
                        className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        value={user?.phone || ''}
                        readOnly
                    />
                </form>
            </section>
        </div>
    );
};
