import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="w-screen">
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
                        <Link to="/cart" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Order
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Favourite
                        </Link>
                        <Link to="#" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Wishlist
                        </Link>
                        <Link to="/login" className='group'>
                            <i className="fas fa-arrow-right group-hover:text-black"></i> My Account
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
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-pinterest group-hover:text-black"></i> pinterest
                        </Link>
                    </div>

                    <div className="flex flex-col text-2xl gap-4 text-white">
                        <h3 className="text-3xl text-black mb-5 font-medium">Payments</h3>

                        <Link to="#" className='group'>
                            <i className="fa-brands fa-google-pay group-hover:text-black mr-3  text-3xl"></i>
                            Google</Link>
                        <Link to="#" className='group'>
                            <i className="fa-regular fa-credit-card group-hover:text-black mr-5"></i>
                            Card</Link>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-apple-pay group-hover:text-black mr-3 text-3xl"></i>
                            Apple</Link>
                        <Link to="#" className='group'>
                            <i className="fa-brands fa-amazon-pay group-hover:text-black mr-3 text-3xl"></i>
                            Amazon</Link>

                    </div>
                </div>
            </footer>
            <div className="bg-black text-white text-center text-lg">Created by Shubh Patel | All rights reserved!</div>

        </div>
    )
}