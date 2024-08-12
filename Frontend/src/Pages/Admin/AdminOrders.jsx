import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilteredOrders(
                orders.filter((order) =>
                    order._id.startsWith(searchTerm.trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, orders]);

    const getAllOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/orders`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/orders/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getAllOrders();
                toast.success("Order deleted successfully");
            } else {
                toast.error("Error in deleting order");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const toggleDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by OrderId"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Username</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Details</th>
                            <th className="py-3 px-4 text-left">Edit</th>
                            <th className="py-3 px-4 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 25 }).map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4"><Skeleton /></td>
                                    <td className="py-3 px-4"><Skeleton width={100} /></td>
                                    <td className="py-3 px-4"><Skeleton width={150} /></td>
                                    <td className="py-3 px-4"><Skeleton width={80} /></td>
                                    <td className="py-3 px-4"><Skeleton width={80} /></td>
                                    <td className="py-3 px-4"><Skeleton width={100} /></td>
                                    <td className="py-3 px-4"><Skeleton width={80} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                </tr>
                            ))
                        ) : (
                            filteredOrders.map((order, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border border-solid">
                                        <td className="py-3 px-4 normal-case">{order._id}</td>
                                        <td className="py-3 px-4 normal-case">{order.userId.username}</td>
                                        <td className="py-3 px-4 normal-case">{order.userId.email}</td>
                                        <td className="py-3 px-4 normal-case">{order.status}</td>
                                        <td className="py-3 px-4 normal-case">{order.payment ? "Paid" : "Unpaid"}</td>
                                        <td className="py-3 px-4 normal-case">{order.date}</td>
                                        <td className="py-3 px-4 normal-case">
                                            <button onClick={() => toggleDetails(order._id)} className="text-blue-500">
                                                {expandedOrderId === order._id ? "Hide Details" : "Show Details"}
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/admin/orders/${order._id}/edit`} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Edit</Link>
                                        </td>
                                        <td className="py-3 px-4 normal-case"><button onClick={() => deleteOrder(order._id)} className='border-solid border-gray-400 p-1 hover:border-gray-600 rounded-lg'>Delete</button></td>
                                    </tr>
                                    {expandedOrderId === order._id && (
                                        <tr>
                                            <td colSpan="7" className=" p-4">
                                                <div className="flex gap-x-8">
                                                    <div className="mb-2">
                                                        <strong>Items:</strong>
                                                        <ul>
                                                            {order.items.map((item, i) => (
                                                                <li key={i}>
                                                                    {item.name} ({item.quantity} kg)
                                                                </li>
                                                            ))}
                                                            <p className="font-bold">Amount: {order.amount}</p>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <strong>Address:</strong>
                                                        <p>{order.address.firstname} {order.address.lastname}</p>
                                                        <p className="normal-case">{order.address.email}</p>
                                                        <p className="normal-case">{order.address.phone}</p>
                                                        <p>{order.address.street}, {order.address.city}, {order.address.pincode}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    );
}

export default AdminOrders;
