import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }


        console.log('Signup details:', { firstName, lastName, email, password });
        setError('');
    };

    return (
        <div>
            <section className="signup bg-[#fff] px-5 py-10  min-h-[100vh] flex items-center justify-center text-2xl w-full">
                <form onSubmit={handleSignup} className="signup-form  m-4 p-12 flex flex-col shadow-[0.2rem_0.2rem_0.2rem_0.2rem_#a8a297]">
                    <h1 className="text-center text-3xl mb-5 font-semibold">Sign Up</h1>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        placeholder="First Name"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input type="submit" value="Sign Up" className="btn p-3 rounded text-white cursor-pointer w-full text-2xl" />
                    <p className="text-center mt-3 normal-case">Already have an account? <Link to="/login" className=" text-[#cf1a1a] hover:underline">Login </Link></p>
                </form>
            </section>
        </div >
    );
}

export default Signup;
