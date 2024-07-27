import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleSignup = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <section className="signup px-5 py-10  min-h-[100vh] flex items-center justify-center text-2xl w-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('/SliderImages/bg16.jpg')` }}>
                <form onSubmit={handleSubmit} className="signup-form  m-4 p-12 flex flex-col ">
                    <h1 className="text-center text-3xl mb-5 font-semibold">Sign Up</h1>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-black focus:border-[#ff9421] bg-transparent"
                        value={user.username}
                        onChange={handleSignup}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-black focus:border-[#ff9421] bg-transparent"
                        value={user.email}
                        onChange={handleSignup}
                    />
                    <label htmlFor="phone">Phone No.</label>
                    <input
                        type="Number"
                        name="phone"
                        id="phone"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-black focus:border-[#ff9421] bg-transparent"
                        value={user.phone}
                        onChange={handleSignup}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-black focus:border-[#ff9421] bg-transparent"
                        value={user.password}
                        onChange={handleSignup}
                    />

                    <input type="submit" value="Sign Up" className="btn p-3 rounded text-white cursor-pointer w-full text-2xl" />
                    <p className="text-center mt-3 normal-case">Already have an account? <Link to="/login" className=" text-[#cf1a1a] hover:underline">Login </Link></p>
                </form>
            </section>
        </div >
    );
}

export default Signup;
