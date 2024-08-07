import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import Heading from '../../Components/Heading/Heading';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItems, deleteFromCart, incrementQuantity, decrementQuantity, emptyCart, shopItems, totalPrice } = useCart();
    const [checkoutMessage, setCheckoutMessage] = useState('');

    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);



    const size = Object.keys(cartItems).length;


    return (
        <div>
            <Heading name1="Shopping Cart" name2="Cart" />

            {Object.keys(cartItems).length === 0 && !checkoutMessage ? (
                <p className="empty text-5xl text-center pt-36 pb-[32rem] normal-case font-semibold">You haven't added any items to your cart yet.</p>
            ) : (
                <section className="w-full">
                    {shopItems
                        .filter((item) => cartItems[item._id])
                        .map((item) => (
                            <div key={item._id} className="flex h-[20rem] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] items-center justify-between w-full">
                                <div className="grid grid-cols-2 sm:gap-0 w-4/5">
                                    <div
                                        className="h-[15rem] bg-contain bg-center bg-no-repeat justify-center flex items-center"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col justify-center items-center">
                                            <h3 className="text-3xl sm:text-4xl text-black font-semibold">{item.name}</h3>
                                            <h2 className="text-2xl sm:text-3xl text-black mt-6">
                                                <i className="fa fa-indian-rupee-sign"></i>{item.price}
                                            </h2>
                                        </div>
                                        <div className="quantity-control text-2xl sm:text-3xl flex flex-col items-center justify-center">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    className="px-4 py-2 bg-gray-200 text-black rounded"
                                                    onClick={() => decrementQuantity(item._id)}
                                                >-</button>
                                                <span className="text-nowrap px-4 py-2 text-black rounded">{cartItems[item._id]} kg</span>
                                                <button
                                                    className="px-4 py-2 bg-gray-200 text-black rounded"
                                                    onClick={() => incrementQuantity(item._id)}
                                                >+</button>
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl text-black text-center mt-4">
                                                <i className="fa fa-indian-rupee-sign"></i>{item.price * cartItems[item._id]}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center text-3xl mr-9 w-1/5'>
                                    <i
                                        className="fas fa-times text-[#ff9421] cursor-pointer hover:text-[#cf1a1a]"
                                        onClick={() => deleteFromCart(item._id)}
                                    ></i>
                                </div>
                            </div>
                        ))}
                    <h3 className="total text-3xl sm:text-4xl text-center mt-[7rem] font-semibold">
                        Total: <span><i className="fa fa-indian-rupee-sign"></i>{totalPrice(cartItems, shopItems)}</span>
                    </h3>
                    <div className='button-container flex flex-col items-center justify-center'>
                        <Link className="btn p-3 text-white rounded-lg text-3xl mt-5" to="/order">Checkout Cart</Link>
                        {checkoutMessage && <p className="checkout-message mt-4 normal-case text-3xl text-center">{checkoutMessage}</p>}
                    </div>
                </section>
            )}
        </div>


    );
}

export default Cart;

