import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleLogin = (e) => {
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
            <section className="login px-5 py-10  min-h-[100vh] flex items-center justify-center text-2xl w-full">
                <form onSubmit={handleSubmit} className="login-form m-4 p-12 flex flex-col shadow-[0.2rem_0.2rem_0.2rem_0.2rem_#a8a297]">
                    <h1 className='text-center text-3xl mb-5 font-semibold'>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297] focus:border-[#ff9421]"
                        value={user.email}
                        onChange={handleLogin}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete='off'
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297] focus:border-[#ff9421]"
                        value={user.password}
                        onChange={handleLogin}
                    />

                    <input type="submit" value="Login" className="btn p-3 rounded text-white cursor-pointer w-full text-2xl" />

                    <p className="text-center mt-3 normal-case">
                        Forgot your password? <Link to="#" className="text-[#cf1a1a] hover:underline">Click here</Link>
                    </p>

                    <p className="text-center mt-3 normal-case">
                        Don't have an account? <Link to="/signup" className="text-[#cf1a1a] hover:underline">Sign Up</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Login;
