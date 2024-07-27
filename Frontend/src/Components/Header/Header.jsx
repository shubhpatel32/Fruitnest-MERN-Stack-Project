import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const Header = () => {
    const { cartItems } = useCart();
    const cartCount = cartItems.length;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    onscroll = (isMenuOpen) => {
        if (isMenuOpen)
            setIsMenuOpen(false);
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-[7rem] z-50 bg-gradient-to-l from-red-700 to-yellow-400 flex items-center justify-between px-8 py-4 md:px-16 md:py-8">
            <Link to="/" className="text-[2.5rem] md:text-[2.5rem] font-bold text-black hover:text-black cursor-pointer flex-shrink-0">
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

            <div className="flex text-center justify-center">
                <div id="menu-btn" className={`md:hidden ${isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} text-[2.5rem] ml-4 cursor-pointer text-black hover:text-white text-center`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                </div>
                <div className="relative">
                    <NavLink to="/cart" id="cart-btn" className="fas fa-cart-shopping text-[2.5rem] md:text-[2.5rem] ml-4 cursor-pointer text-black hover:text-white"></NavLink>
                    {cartCount > 0 && (
                        <span className="absolute top-[-8px] right-[-8px] bg-yellow-500 text-black text-[1rem] px-2 py-1 rounded-full font-bold">
                            {cartCount}
                        </span>
                    )}
                </div>
                <NavLink to="/login" id="login-btn" className="fas fa-user text-[2.5rem] md:text-[2.5rem] ml-4 cursor-pointer text-black hover:text-white"></NavLink>
            </div>
        </header >
    );
};

export default Header;
