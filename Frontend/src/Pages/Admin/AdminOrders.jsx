import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminOrders = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { authorizationToken } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(orders);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editingOrder, setEditingOrder] = useState({ status: '', payment: '' });

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
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

    const startEditing = (order) => {
        setEditingOrderId(order._id);
        setEditingOrder({ status: order.status, payment: order.payment });
    };

    const cancelEditing = () => {
        setEditingOrderId(null);
    };

    const saveChanges = async (orderId) => {
        try {
            const response = await fetch(`${apiUrl}/admin/orders/update/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(editingOrder),
            });

            if (response.ok) {
                toast.success("Order updated successfully");
                getAllOrders();
                setEditingOrderId(null);
            } else {
                toast.error("Error updating order");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order");
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 border border-solid border-green-700 text-green-700';
            case 'Shipped':
                return 'bg-blue-100 border border-solid border-blue-700 text-blue-700';
            case 'Cancelled':
                return 'bg-red-100 border border-solid border-red-700 text-red-700';
            case 'Pending':
                return 'bg-orange-100 border border-solid border-orange-700 text-orange-700';
            default:
                return 'bg-gray-100 border border-solid border-gray-700 text-gray-700';
        }
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
                    <i onClick={() => {
                        setFiltered(orders);
                        setSearchTerm('')
                    }} className="fa fa-times flex items-center mr-4 text-gray-700 text-2xl"></i>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className="bg-gray-400 border-b border-gray-700">
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left w-[10%]">Status</th>
                            <th className="py-3 px-4 text-left w-[10%]">Payment</th>
                            <th className="py-3 px-4 text-left w-[10%]">Payment Method</th>
                            <th className="py-3 px-4 text-left w-[9%]">Date</th>
                            <th className="py-3 px-4 text-left w-[11%]">Edit</th>
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
                                    <td className="py-3 px-4"><Skeleton width={80} /></td>
                                    <td className="py-3 px-4"><Skeleton width={100} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                    <td className="py-3 px-4"><Skeleton width={60} /></td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((order, index) => (
                                <tr key={index} className="border border-solid h-28">
                                    <td className="py-3 px-4 normal-case">{order._id}</td>
                                    <td className="py-3 px-4 normal-case">{order.userId.email}</td>
                                    <td className="py-3 px-4 normal-case">&#8377;{order.amount}</td>
                                    <td className="py-3 px-4 rounded-lg normal-case">
                                        {editingOrderId === order._id ? (
                                            <select
                                                value={editingOrder.status}
                                                onChange={(e) =>
                                                    setEditingOrder({ ...editingOrder, status: e.target.value })
                                                }
                                                className="p-2 mb-4 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Shipped">Shipped</option>
                                            </select>
                                        ) : (
                                            <span className={`${getStatusColorClass(order.status)} p-3 px-5 rounded-3xl text-center`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">
                                        {editingOrderId === order._id ? (
                                            <select
                                                value={editingOrder.payment}
                                                onChange={(e) =>
                                                    setEditingOrder({ ...editingOrder, payment: e.target.value })
                                                }
                                                className="p-2 mb-4 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent"
                                            >
                                                <option value="Paid">Paid</option>
                                                <option value="Unpaid">Unpaid</option>
                                                <option value="Unpaid">Refunded</option>
                                                <option value="Failed">Failed</option>
                                            </select>
                                        ) : (
                                            order.payment ? order.payment : "Unpaid"
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case">{order.paymentMethod}</td>
                                    <td className="py-3 px-4 normal-case">{order.date}</td>
                                    <td className="py-3 px-4">
                                        {editingOrderId === order._id ? (
                                            <>
                                                <button
                                                    onClick={() => saveChanges(order._id)}
                                                    className="py-1 px-4 mr-2 rounded-lg bg-green-500 text-white"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="py-1 px-4 rounded-lg bg-gray-500 text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => startEditing(order)}
                                                className="py-1 px-4 rounded-lg bg-orange-400 text-white"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => deleteOrder(order._id)}
                                            className="py-1 px-4 rounded-lg bg-red-500 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
