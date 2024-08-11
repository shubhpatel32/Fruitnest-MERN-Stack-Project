import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AdminReviews = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [reviews, setReviews] = useState([]);


    const getAllReviews = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/reviews`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReview = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/reviews/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if (response.ok) {
                getAllReviews();
                toast.success("Review deleted successfully");
            } else {
                toast.error("Error in deleting review");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllReviews();
    }, []);

    return (
        <div className="p-4 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left ">Username</th>
                            <th className="py-3 px-4 text-left ">Email</th>
                            <th className="py-3 px-4 text-left ">Review</th>
                            <th className="py-3 px-4 text-left ">Edit</th>
                            <th className="py-3 px-4 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index} className="border border-solid">
                                <td className="py-3 px-4 normal-case">{review.userId.username}</td>
                                <td className="py-3 px-4 normal-case">{review.userId.email}</td>
                                <td className="py-3 px-4 normal-case">{review.review}</td>
                                <td className="py-3 px-4 normal-case"><button className='border-solid border-gray-400  hover:border-gray-600 p-1 rounded-lg'>Edit</button></td>
                                <td className="py-3 px-4 normal-case"><button onClick={() => deleteReview(review._id)} className='border-solid border-gray-400 hover:border-gray-600 p-1 rounded-lg'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminReviews
