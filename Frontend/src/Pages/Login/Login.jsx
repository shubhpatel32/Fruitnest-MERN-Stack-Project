import React, { useState } from 'react';
// import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Validation
        let isValid = true;
        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        }

        // Submit if valid
        if (isValid) {
            // Perform login logic here (e.g., API call)
            console.log('Logging in with:', email, password);
        }
    };

    return (
        <div>
            <section className="login bg-[#fff] px-5 py-10  min-h-[100vh] flex items-center justify-center text-2xl w-full">
                <form onSubmit={handleLogin} className="login-form m-4 p-12 flex flex-col shadow-[0.2rem_0.2rem_0.2rem_0.2rem_#a8a297]">
                    <h1 className='text-center text-3xl mb-5 font-semibold'>Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        className="box p-2 mb-7 w-full  rounded border border-solid border-[#a8a297]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                    <div className="remember flex items-center mb-4">
                        <input type="checkbox" id="remember-me" className='mr-3 accent-[#ff9421]' />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
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
