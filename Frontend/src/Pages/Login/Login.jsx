import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const URL = "http://localhost:5000/api/auth/login";

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleLogin = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            const res_data = await response.json();
            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({
                    email: '',
                    password: '',
                });
                navigate("/");
            } else {
                console.error("Login failed:", res_data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div>
            <section className="login px-5 py-10 min-h-[100vh] flex items-center justify-center text-2xl w-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('/SliderImages/bg18.jpg')` }}>
                <form onSubmit={handleSubmit} className="login-form m-4 p-12 flex flex-col rounded border border-solid border-[#a8a297]">
                    <h1 className='text-center text-3xl mb-5 font-semibold'>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete='on'
                        className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        value={user.email}
                        onChange={handleLogin}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete='on'
                        className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                        value={user.password}
                        onChange={handleLogin}
                    />

                    <input type="submit" value="Login" className="btn p-3 rounded text-white cursor-pointer w-full text-2xl" />

                    <p className="text-center mt-6 normal-case">
                        Don't have an account? <Link to="/signup" className="text-[#cf1a1a] hover:underline">Sign Up</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Login;
