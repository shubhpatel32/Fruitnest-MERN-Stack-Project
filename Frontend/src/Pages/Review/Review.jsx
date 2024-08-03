import React, { useState } from 'react';
import Heading from '../../Components/Heading/Heading';
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
const URL = "http://localhost:5000/api/form/review";
import { toast } from 'react-toastify';


function Review() {
    // const reviews = [
    //     { name: "Shlok", role: "happy client", image: "Images/male.png", comment: "I'm very impressed with the quick delivery service. The scooter arrived within 30 minutes of placing my order. Excellent service!" },
    //     { name: "Avani", role: "happy client", image: "Images/female.png", comment: "Great customer support! I can always reach them on the phone, no matter the time. Really convenient for busy people like me." },
    //     { name: "Anshuman", role: "happy client", image: "Images/male.png", comment: "The payment process is so easy! I love the flexibility to pay with cash or UPI. It makes transactions hassle-free." },
    //     { name: "Simran", role: "happy client", image: "Images/female.png", comment: "Absolutely amazing service! The delivery was prompt and the customer service is top-notch. Highly recommended!" },
    //     { name: "Anushka", role: "happy client", image: "Images/female.png", comment: "Superb experience! The entire process was seamless from start to finish. Their attention to customer satisfaction is commendable." },
    //     { name: "Virat", role: "happy client", image: "Images/male.png", comment: "Impressed with the professionalism! They really take care of every detail. Will definitely use their service again." },
    //     { name: "Sanidhya", role: "satisfied customer", image: "Images/female.png", comment: "Quick response and effective service! I'm glad I chose them for my delivery needs. Their reliability sets them apart." },
    //     { name: "Kabir", role: "regular customer", image: "Images/male.png", comment: "Consistently excellent service! I've been using their service for months now and they never disappoint. Highly reliable!" },
    //     // { name: "Priya", role: "new customer", image: "Images/female.png", comment: "First-time user and very impressed! The whole experience was smooth and efficient. Definitely recommend to others." },
    // ];

    const [data, setData] = useState({
        username: '',
        email: '',
        review: ''
    });

    const { user, reviews, isLoggedIn } = useAuth();

    const [userData, setUserData] = useState(true)


    if (user && userData) {
        setData({
            username: user.username,
            email: user.email,
            review: "",
        })
        setUserData(false);
    }


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))

    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        e.preventDefault();

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log(data);
            const res_data = await response.json();

            if (response.ok) {

                setData({
                    ...data,
                    review: '',
                })
                toast.success("Thank you for your feedback!")
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("review", error);
        }
    }


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

            <section className="review px-5 py-4 flex items-center justify-center text-2xl">
                <form onSubmit={handleSubmit} className="signup-form  m-4 p-12 flex flex-col  rounded border-2 border-solid border-[#a8a297] w-full sm:w-[80%]">
                    <h1 className="text-center text-3xl mb-5 font-semibold">Write a Review</h1>

                    <section className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mt-4 px-4 py-0 items-start'>

                        <div className="grid grid-cols-1 gap-2">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                                readOnly
                                // autoComplete='off'
                                className="box p-2 mb-4 w-full  rounded border-2 border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={data.username}
                                onChange={handleInput}
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                readOnly
                                // autoComplete='off'
                                className="box p-2 mb-4 w-full  rounded border-2 border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={data.email}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-1">

                            <label htmlFor="review">Review</label>
                            <textarea
                                name='review'
                                id='review'
                                required
                                className='box mb-3 w-full  rounded border-2 border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case resize-none'
                                cols="30"
                                rows="5"
                                value={data.review}
                                onChange={handleInput}
                            ></textarea>
                        </div>

                    </section>
                    <div className='items-center flex justify-center'>
                        <input type="submit" value="Submit Review" className="btn rounded text-white cursor-pointer w-auto text-2xl justify-center flex items-center " />
                    </div>
                </form>
            </section>

            <section className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 justify-center gap-12">
                {reviews.map((review, index) => (
                    <div className="flex p-4 flex-col items-start h-[10rem] sm:h-[14rem] w-full overflow-hidden hover:overflow-auto border-2 border-solid border-[#a8a297] roundeds" key={index}>
                        <div className="flex items-start flex-col gap-0 p-0">
                            <h3 className="text-[2rem] font-medium text-black">{review.username}</h3>
                        </div>
                        <p className="text-[1.2rem] text-justify items-start text-slate-700 normal-case mt-4">{review.review}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Review;
