import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';


function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

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
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
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
                toast.success("Login Successful");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen'>
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    />

                    <input
                        type="submit"
                        value={isSubmitting ? "Logging in..." : "Login"}
                        disabled={isSubmitting}
                        className={`btn p-3 rounded text-white w-full text-2xl ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                    />

                    <p className="text-center mt-4 normal-case">
                        <Link to="/forgot-password" className="text-[#cf1a1a] hover:underline">Forgot Password?</Link>
                    </p>

                    <p className="text-center mt-6 normal-case">
                        Don't have an account? <Link to="/signup" className="text-[#cf1a1a] hover:underline">Sign Up</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Login;
