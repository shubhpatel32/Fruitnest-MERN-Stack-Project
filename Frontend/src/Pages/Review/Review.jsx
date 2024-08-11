import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading/Heading";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Review() {
    const [data, setData] = useState({
        userId: "",
        review: "",
    });

    const { user, isLoggedIn } = useAuth();
    const [reviews, setReviews] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (user) {
            setData((prev) => ({
                ...prev,
                userId: user._id,
            }));
        }
    }, [user]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/review/form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();

            if (response.ok) {
                setReviews((prev) => [...prev, data]);
                setData((prev) => ({
                    ...prev,
                    review: "",
                }));
                toast.success("Thank you for your feedback!");
            } else {
                toast.error(resData.extraDetails ? resData.extraDetails : resData.message);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        }
    };

    const getReviews = async () => {
        try {
            const response = await fetch(`${apiUrl}/review/data`, {
                method: "GET",
            });

            if (response.ok) {
                const reviews = await response.json();
                setReviews(reviews);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        getReviews();
    }, [reviews]);

    return (
        <div className="min-h-screen">
            <Heading name1="Customer Reviews" name2="Review" />

            <section className="w-full grid grid-cols-3 gap-8 justify-center">
                <div className="flex items-center flex-col justify-center text-center ">
                    <div
                        className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat"
                        style={{ backgroundImage: "url('Images/scooter_147272.png')" }}
                    ></div>
                    <div>
                        <h3 className="text-[1.5rem] py-2 font-semibold">Fast Delivery</h3>
                        <span className="text-[1.3rem]">Within 30 minutes</span>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center text-center">
                    <div
                        className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat"
                        style={{ backgroundImage: "url('Images/phone-call_3616215.png')" }}
                    ></div>
                    <div>
                        <h3 className="text-[1.5rem] py-2 font-semibold">Available on Phone</h3>
                        <span className="text-[1.3rem]">Anytime</span>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center text-center">
                    <div
                        className="bg-white h-32 w-full bg-center bg-contain bg-no-repeat"
                        style={{ backgroundImage: "url('Images/pay_625599.png')" }}
                    ></div>
                    <div>
                        <h3 className="text-[1.5rem] py-2 font-semibold">Easy Payments</h3>
                        <span className="text-[1.3rem]">Cash or UPI</span>
                    </div>
                </div>
            </section>

            <section className="review px-5 py-4 flex items-center justify-center text-2xl">
                <form
                    onSubmit={handleSubmit}
                    className="  m-4 p-4 flex flex-col w-full sm:w-[70%] md:w-[40%]"
                >
                    <h1 className="text-center text-3xl mb-5 font-semibold">Write a Review</h1>

                    <section className="grid grid-cols-1 gap-2 sm:gap-8 mt-4 px-4 py-0 items-start">
                        <div className="grid grid-cols-1 gap-1">
                            <label htmlFor="review">Review</label>
                            <textarea
                                name="review"
                                id="review"
                                required
                                className="box mb-3 p-2 w-full rounded border-2 border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case resize-none"
                                cols="30"
                                rows="5"
                                value={data.review}
                                onChange={handleInput}
                            ></textarea>
                        </div>
                    </section>

                    <div className="items-center flex justify-center">
                        <input
                            type="submit"
                            value="Submit Review"
                            className="btn rounded text-white cursor-pointer w-auto text-2xl justify-center flex items-center"
                        />
                    </div>
                </form>
            </section>

            <section className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 justify-center gap-12">
                {reviews.map((review, index) => (
                    <div
                        className="flex p-4 flex-col items-start h-[14rem] sm:h-[14rem] w-full overflow-hidden hover:overflow-auto border-2 border-solid border-[#a8a297] roundeds"
                        key={index}
                    >
                        <div className="flex items-start flex-col gap-0 p-0">
                            <h3 className="text-[2rem] font-medium text-black">{review.userId.username}</h3>
                        </div>
                        <p className="text-[1.2rem] text-justify items-start text-slate-700 normal-case mt-4">
                            {review.review}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Review;
