import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = () => {
    const { user } = useAuth();
    const { token, shopItems, cartItems, setCartItems } = useCart();

    function totalPrice(orderItems) {
        return orderItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }


    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        street: '',
        city: '',
        state: '',
        pincode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let orderItems = [];
        shopItems.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        console.log("Orderitems", orderItems);

        let orderData = {
            address: address,
            items: orderItems,
            amount: totalPrice(orderItems),
        }

        console.log("OrderData before request:", orderData);


        if (token) {
            const response = await axios.post("http://localhost:5000/api/order/place", orderData, { headers: { token } });

            if (response.data.success) {
                toast.success("Order placed successfully");
                setCartItems({});
            }
            else {
                toast.error("Failed to place order");
            }
        } else {
            console.warn("No token available");
        }


        setAddress({
            firstname: '',
            lastname: '',
            email: user ? user.email : '',
            phone: user ? user.phone : '',
            street: '',
            city: '',
            state: '',
            pincode: ''
        });
    };

    // useEffect(() => {
    //     console.log('address:', address);
    // }, [address])

    return (
        <div>
            <section className="py-44 px-52 min-h-screen">
                <form onSubmit={handleFormSubmit} className="p-8 ">
                    <h3 className="text-3xl pb-4 text-black font-semibold text-center">Address Form</h3>
                    <div className="inputbox grid grid-cols-1 md:grid-cols-2 gap-x-4 text-[1.5rem]">
                        <div className='mb-2'>
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                required
                                className="box p-2 mb-0 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={user ? user.email : address.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={user ? user.phone : address.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="street">Street</label>
                            <input
                                type="text"
                                name="street"
                                id="street"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.street}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                required
                                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                                value={address.pincode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="bttn items-center flex justify-center flex-col">
                        <input type="submit" value="Place Order" className="btn mt-4" />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Order;
