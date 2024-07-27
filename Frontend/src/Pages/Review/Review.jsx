import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../Components/Heading/Heading';
// import './Review.css';

function Review() {
    const reviews = [
        { name: "Shlok", role: "happy client", image: "Images/male.png", comment: "I'm very impressed with the quick delivery service. The scooter arrived within 30 minutes of placing my order. Excellent service!" },
        { name: "Avani", role: "happy client", image: "Images/female.png", comment: "Great customer support! I can always reach them on the phone, no matter the time. Really convenient for busy people like me." },
        { name: "Anshuman", role: "happy client", image: "Images/male.png", comment: "The payment process is so easy! I love the flexibility to pay with cash or UPI. It makes transactions hassle-free." },
        { name: "Simran", role: "happy client", image: "Images/female.png", comment: "Absolutely amazing service! The delivery was prompt and the customer service is top-notch. Highly recommended!" },
        { name: "Anushka", role: "happy client", image: "Images/female.png", comment: "Superb experience! The entire process was seamless from start to finish. Their attention to customer satisfaction is commendable." },
        { name: "Virat", role: "happy client", image: "Images/male.png", comment: "Impressed with the professionalism! They really take care of every detail. Will definitely use their service again." },
        { name: "Sanidhya", role: "satisfied customer", image: "Images/female.png", comment: "Quick response and effective service! I'm glad I chose them for my delivery needs. Their reliability sets them apart." },
        { name: "Kabir", role: "regular customer", image: "Images/male.png", comment: "Consistently excellent service! I've been using their service for months now and they never disappoint. Highly reliable!" },
        // { name: "Priya", role: "new customer", image: "Images/female.png", comment: "First-time user and very impressed! The whole experience was smooth and efficient. Definitely recommend to others." },
    ];

    return (
        <div>

            <Heading name1="Customer Reviews" name2="Review" />

            <section className="w-full grid grid-cols-3 gap-8 justify-center">
                <div className="flex items-center flex-col justify-center text-center ">
                    <div className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: "url('Images/scooter_147272.png')" }}></div>
                    <div >
                        <h3 className="text-[1.5rem] py-2 font-semibold">Fast Delivery</h3>
                        <span className="text-[1.3rem]">Within 30 minutes</span>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center text-center">
                    <div className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: "url('Images/phone-call_3616215.png')" }}></div>
                    <div>
                        <h3 className="text-[1.5rem] py-2 font-semibold">Available on Phone</h3>
                        <span className="text-[1.3rem]">Anytime</span>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center text-center">
                    <div className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: "url('Images/pay_625599.png')" }}></div>
                    <div>
                        <h3 className="text-[1.5rem] py-2 font-semibold">Easy Payments</h3>
                        <span className="text-[1.3rem]">Cash or UPI</span>
                    </div>
                </div>
            </section>

            <section className="w-full h-full grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 justify-center gap-12">
                {reviews.map((review, index) => (
                    <div className="flex p-8 flex-col justify-center text-center h-[25rem] w-full overflow-hidden border-2 border-solid border-[#a8a297]" key={index}>
                        <div className="flex items-center flex-col gap-4 p-4">
                            <div className="h-[10rem] pt-20 bg-white w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${review.image}')` }}></div>
                            <div className="info">
                                <h3 className="text-[2rem] font-semibold text-black">{review.name}</h3>
                                <span className="text-2xl text-slate-800">{review.role}</span>
                            </div>
                        </div>
                        <p className="text-[1.2rem] text-justify items-start text-slate-700 normal-case">{review.comment}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Review;
