import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {
    const { cartItems } = useCart();
    const { isLoggedIn } = useAuth();
    const cartCount = Object.keys(cartItems).length;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    onscroll = (isMenuOpen, isOpen) => {
        if (isMenuOpen || isOpen) {
            setIsMenuOpen(false);
            setIsOpen(false);
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <header className="fixed top-0 left-0 right-0 w-full h-[6rem] z-50 bg-gradient-to-l from-red-700 to-yellow-400 flex items-center justify-between px-8 py-4 md:px-16 md:py-8">
            <Link to="/" className="text-[2.5rem]  font-bold text-black hover:text-black cursor-pointer flex-shrink-0">
                <i className="fa-solid fa-apple-whole pr-2 text-red-700"></i>Fruitnest
            </Link>

            <div className="flex items-center justify-between w-full md:w-auto">
                <nav className={`absolute top-[61px] flex-col md:flex-row md:flex ${isMenuOpen ? 'flex bg-white gap-3' : 'hidden'} md:flex items-center text-[1.5rem] md:text-2xl text-white font-medium w-full left-0 md:items-center md:justify-center md:top-[10px] md:w-auto md:static  divide-y p-4`}>

                    <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`}>
                        Home
                    </NavLink>
                    <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`
                    }>
                        Shop
                    </NavLink>
                    <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`
                    }>
                        About
                    </NavLink>
                    <NavLink to="/review" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`
                    }>
                        Review
                    </NavLink>
                    <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`
                    }>
                        Blog
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                        `${isActive ? 'text-black' : 'text-white'} hover:text-black bg-gradient-to-l from-red-700 to-yellow-400 w-full text-center  md:bg-none md:w-auto md:mt-0 p-2`
                    }>
                        Contact
                    </NavLink>
                </nav>
            </div>

            <div className="flex text-center justify-center items-center">
                <div id="menu-btn" className={`md:hidden ${isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} text-[2.5rem] ml-4 cursor-pointer text-black hover:text-white text-center`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                </div>

                {
                    isLoggedIn ? (<>
                        <div className="relative">
                            <NavLink to="/cart" id="cart-btn" className="fas fa-cart-shopping text-[2.2rem]  ml-4 cursor-pointer text-black hover:text-white"></NavLink>
                            {cartCount > 0 && (
                                <span className="absolute top-[-8px] right-[-8px] bg-yellow-500 text-black text-[0.9rem] px-2 py-1 rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full text-[2.2rem] ml-3 cursor-pointer text-black hover:text-white"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    onClick={toggleDropdown}
                                >
                                    <i className="fas fa-user"></i>

                                </button>
                            </div>
                            {isOpen && (
                                <ul
                                    className="origin-top-right absolute right-0 mt-4 w-56 rounded-lg shadow-lg bg-white text-lg"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <li>
                                        <Link to="/profile"
                                            className="block px-4 py-2 text-[1.5 rem] md:text-[1.5rem] text-black hover:bg-gray-400 m-2 bg-gray-300 rounded-lg"
                                            onClick={toggleDropdown}
                                        >
                                            My Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/myorder"
                                            className="block px-4 py-2 text-[1.5 rem] md:text-[1.5rem] text-black hover:bg-gray-400 m-2 bg-gray-300 rounded-lg"
                                            onClick={toggleDropdown}
                                        >
                                            My Orders
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/logout"
                                            className="block px-4 py-2 text-[1.5 rem] md:text-[1.5rem] text-black hover:bg-gray-400  m-2 bg-gray-300 rounded-lg"
                                            onClick={toggleDropdown}
                                        >
                                            Logout
                                        </Link>
                                    </li>

                                </ul>
                            )}
                        </div>

                    </>) : (<>
                        <NavLink to="/login" id="login-btn" className=" text-[1.7rem] ml-4 cursor-pointer text-black font-medium p-2 normal-case border border-solid rounded-lg w-32">Login</NavLink>
                    </>)
                }
            </div>
        </header >
    );
};

export default Header;
