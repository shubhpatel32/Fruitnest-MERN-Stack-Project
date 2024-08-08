import React from 'react'
import { useAuth } from '../../Context/AuthContext';

const MyOrders = () => {
    const { orders } = useAuth();


    return (
        <div className="container mx-auto py-40 min-h-screen px-10 md:px-20">
            <h2 className="text-4xl font-bold mb-6">My Orders</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="p-12 mb-8 rounded shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] grid grid-cols-1 sm:grid-cols-2 text-3xl">
                        <div>
                            <div className="mb-6">
                                <strong>Order ID:</strong> {order._id}
                            </div>
                            <div className="mb-6">
                                <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                            </div>
                            <div className="mb-6">
                                <strong>Order Status:</strong> {order.status}
                            </div>
                            <div className="mb-6">
                                <strong>Payment:</strong> {order.payment ? 'Paid' : 'Pending'}
                            </div>
                            <div className="mb-6">
                                <strong>Address:</strong>
                                <div>{order.address.firstname} {order.address.lastname}</div>
                                <div>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}</div>
                                <div>{order.address.phone}</div>
                            </div>
                        </div>
                        <div>
                            <strong>Items:</strong>
                            <ul className="pl-5 mt-4">
                                {order.items.map(item => (
                                    <li key={item._id} className="mb-1">
                                        <div className="flex items-center justify-between">
                                            <div className="w-[5rem] h-[5rem] mr-2 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div>{item.name}</div>
                                            <div>&#8377;{item.price}</div>
                                            <div>{item.quantity} kg</div>
                                            <div>&#8377;{item.price * item.quantity}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 text-center text-3xl">
                                <strong>Total Amount: </strong> &#8377;{order.amount}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-3xl">
                    No orders available.
                </div>
            )}

        </div>
    )
}

export default MyOrders;
