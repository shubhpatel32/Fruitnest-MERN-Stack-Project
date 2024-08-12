import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [payment, setPayment] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${apiUrl}/admin/orders/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                    setStatus(data.status);
                    setPayment(data.payment);
                } else {
                    toast.error("Failed to fetch order");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching order details");
            }
        };

        fetchOrder();
    }, [id, apiUrl, authorizationToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`${apiUrl}/admin/orders/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ status, payment }),
            });

            if (response.ok) {
                toast.success("Order updated successfully");
                navigate('/admin/orders');
            } else {
                toast.error("Error updating order");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order");
        }
    };

    return (
        <div className="p-4 bg-white">

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto border border-solid border-[#a8a297] p-8 rounded-sm text-2xl">
                <h1 className="text-3xl text-center font-semibold mb-4">Edit Order</h1>
                <div className="mb-4">
                    <label htmlFor="status" className="block font-medium mb-1">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 mb-4 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Shipped">Shipped</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="payment" className="block font-medium mb-1">Payment Status</label>
                    <select
                        id="payment"
                        name="payment"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        className="p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent"
                    >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn text-white py-2 px-4 "
                >
                    Save Changes
                </button>
            </form>

        </div>
    );
};

export default EditOrder;
