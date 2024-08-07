import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../Components/Heading/Heading';

const Contact = () => {


    return (
        <div className="min-h-screen">
            <Heading name1="Contact Us" name2="Contact" />

            <section className="contact flex flex-col min-h-screen">

                <div className="icons-container w-full gap-8 grid md:grid-cols-3 grid-cols-1">
                    <div className="icons text-center border-2 border-solid border-[#a8a297] p-8">
                        <i className="fa-solid fa-phone h-24 w-24 text-4xl leading-[6rem] bg-[#ff9421] text-white rounded-full hover:bg-[#cf1a1a]"></i>
                        <h3 className="text-3xl py-4 text-black font-normal">Contact Number</h3>
                        <p className="text-2xl text-black normal-case">12345678910</p>
                        <p className="text-2xl text-black normal-case">5566778899</p>
                    </div>

                    <div className="icons text-center border-2 border-solid border-[#a8a297] p-8">
                        <i className="fa-solid fa-envelope h-24 w-24 text-4xl leading-[6rem] bg-[#ff9421] text-white rounded-full hover:bg-[#cf1a1a]"></i>
                        <h3 className="text-3xl py-4 text-black font-normal">Email</h3>
                        <p className="text-2xl text-black normal-case">fruitnest@gmail.com</p>
                    </div>

                    <div className="icons text-center border-2 border-solid border-[#a8a297] p-8">
                        <i className="fa-solid fa-location-dot h-24 w-24 text-4xl leading-[6rem] bg-[#ff9421] text-white rounded-full hover:bg-[#cf1a1a]"></i>
                        <h3 className="text-3xl py-4 text-black font-normal">Address</h3>
                        <p className="text-2xl text-black normal-case">Vijapur, Mehsana, Gujarat - 382870</p>
                    </div>
                </div>

                <div className="my-8 border-2 border-solid border-[#a8a297]  p-8 bg-white">
                    <h3 className="text-4xl text-black mb-5 font-semibold text-center">Follow Us</h3>
                    <div className="grid grid-cols-3 text-3xl gap-6 md:gap-8 text-black">
                        <Link to="#" className="flex flex-col items-center justify-center group hover:bg-[#f0f0f0] rounded-lg p-4 transition duration-300 ease-in-out">
                            <i className="fa-brands fa-facebook text-[#ff9421] group-hover:text-[#cf1a1a] text-[4rem]"></i>
                            <span className="ml-2 hidden sm:inline">Facebook</span>
                        </Link>
                        <Link to="#" className="flex flex-col items-center justify-center group hover:bg-[#f0f0f0] rounded-lg p-4 transition duration-300 ease-in-out">
                            <i className="fa-brands fa-instagram text-[#ff9421] group-hover:text-[#cf1a1a] text-[4rem]"></i>
                            <span className="ml-2 hidden sm:inline">Instagram</span>
                        </Link>
                        <Link to="#" className="flex flex-col items-center justify-center group hover:bg-[#f0f0f0] rounded-lg p-4 transition duration-300 ease-in-out">
                            <i className="fa-brands fa-twitter  text-[#ff9421] group-hover:text-[#cf1a1a] text-[4rem]"></i>
                            <span className="ml-2 hidden sm:inline">Twitter</span>
                        </Link>

                    </div>
                </div>


                <div className="grid grid-cols-1 w-full h-[40rem] md:h-[40rem] mt-8">
                    {/* Google Maps iframe */}
                    <iframe
                        className="map border-2 border-solid border-[#a8a297] w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29257.8559062837!2d72.72507159274966!3d23.560110181742456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395db56e2f3d16a9%3A0x480f5022b1db7329!2sVijapur%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710083990028!5m2!1sen!2sin"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen

                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default Contact;
