import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminReviews = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(reviews);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                reviews.filter((review) =>
                    review.userId.email.startsWith(searchTerm.trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, reviews]);

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
        } finally {
            setLoading(false);
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
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                    <i onClick={() => {
                        setFiltered(reviews);
                        setSearchTerm('')
                    }} className="fa fa-times flex items-center mr-4 text-gray-700 text-2xl"></i>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Username</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Review</th>
                            <th className="py-3 px-4 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4"><Skeleton width={150} /></td>
                                    <td className="py-3 px-4"><Skeleton width={200} /></td>
                                    <td className="py-3 px-4"><Skeleton width={300} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((review, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4 normal-case">{review.userId.username}</td>
                                    <td className="py-3 px-4 normal-case">{review.userId.email}</td>
                                    <td className="py-3 px-4 normal-case">{review.review}</td>
                                    <td className="py-3 px-4 normal-case"><button onClick={() => deleteReview(review._id)} className='py-1 px-4 rounded-lg bg-red-500 text-white'>Delete</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReviews;
