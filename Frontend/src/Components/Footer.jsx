import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="w-screen z-1 relative">
            <footer className="bg-gradient-to-l from-red-700 to-yellow-400 px-20 py-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-[12rem] justify-between w-full">
                    <div className="flex flex-col text-2xl gap-4 text-white ">
                        <h3 className="text-3xl text-black mb-5 font-medium">Quick Links</h3>
                        <Link to="/" className='group inline-block whitespace-nowrap'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> home
                        </Link>
                        <Link to="/shop" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> shop
                        </Link>
                        <Link to="/about" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> about
                        </Link>
                        <Link to="/review" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> review
                        </Link>
                        <Link to="/blog" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> blog
                        </Link>
                        <Link to="/contact" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> contact
                        </Link>
                    </div>

                    <div className="flex flex-col text-2xl gap-4 text-white">
                        <h3 className="text-3xl text-black mb-5 font-medium">Extra Links</h3>

                        <Link to="/profile" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Account
                        </Link>
                        <Link to="/myorder" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Orders
                        </Link>
                        <Link to="/cart" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Cart
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> Terms or Use
                        </Link>
                    </div>

                    <div className="flex flex-col text-2xl gap-4 text-white">
                        <h3 className="text-3xl text-black mb-5 font-medium">Follow us</h3>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-facebook group-hover:text-black"></i> facebook
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-instagram group-hover:text-black"></i> instagram
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-twitter group-hover:text-black"></i> twitter
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-linkedin group-hover:text-black"></i> linkedin
                        </Link>

                    </div>

                    <div className="flex flex-col text-2xl gap-4 text-white">
                        <h3 className="text-3xl text-black mb-5 font-medium">Contact Us</h3>

                        <div className="text-2xl">
                            <h3 className="text-3xl mb-3 font-bold">Fruitnest</h3>
                            <a href="mailto:fruitnest.21@gmail.com" className="text-2xl text-white normal-case hover:text-slate-300">fruitnest.21@gmail.com</a>
                            <p className="normal-case mb-2">Vijapur, Gujarat</p>
                            <p className="normal-case mb-2">382870</p>
                        </div>

                    </div>

                </div>
            </footer>
            <div className="bg-black text-white text-center text-lg normal-case py-1">© {new Date().getFullYear()} Created by Shubh Patel | All rights reserved!</div>

        </div>
    )
}