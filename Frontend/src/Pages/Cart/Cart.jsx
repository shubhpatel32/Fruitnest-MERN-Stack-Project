import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import Heading from '../../Components/Heading/Heading';

function Cart() {
    const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, emptyCart } = useCart();
    const [checkoutMessage, setCheckoutMessage] = useState('');
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            emptyCart();
            setCheckoutMessage('Thank you for your purchase!');
        } else {
            setCheckoutMessage('Your cart is empty.');
        }
    };

    return (
        <div>
            <Heading name1="Shopping Cart" name2="Cart" />

            {cartItems.length === 0 && !checkoutMessage ? (
                <p className="empty text-5xl text-center pt-36 pb-[32rem] normal-case font-semibold">Your cart is empty.</p>
            ) : (
                <section className="w-full">
                    {cartItems.map((item, index) => (
                        <div key="item.id" className="flex h-[20rem] shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] items-center justify-between w-full">
                            <div className="grid grid-cols-2 sm:gap-0 w-4/5">
                                <div className="h-[15rem] bg-contain bg-center bg-no-repeat justify-center flex items-center"
                                    style={{ backgroundImage: `url(${item.image})` }}>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="text-3xl sm:text-4xl text-black font-semibold">{item.name}</h3>
                                        <h2 className="text-2xl sm:text-3xl text-black mt-6"><i className="fa fa-indian-rupee-sign"></i>{item.price}</h2>
                                    </div>

                                    <div className="quantity-control text-2xl sm:text-3xl flex flex-col items-center justify-center">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                className="px-4 py-2 bg-gray-200 text-black rounded"
                                                onClick={() => decrementQuantity(item.id)}
                                            >-</button>
                                            <span className="text-nowrap px-4 py-2 text-black rounded">{item.quantity} kg</span>
                                            <button
                                                className="px-4 py-2 bg-gray-200 text-black rounded"
                                                onClick={() => incrementQuantity(item.id)}
                                            >+</button>
                                        </div>
                                        <h3 className=" rext-2xl sm:text-3xl text-black  text-center mt-4"><i className="fa fa-indian-rupee-sign"></i>{item.price * item.quantity}</h3>
                                    </div>

                                </div>
                            </div>
                            <div className='text-center text-3xl mr-9 w-1/5' >
                                <i className="fas fa-times text-[#ff9421] cursor-pointer hover:text-[#cf1a1a]" onClick={() => removeFromCart(item.id)}></i>
                            </div>

                        </div>

                    ))}

                    <h3 className="total text-3xl sm:text-4xl text-center mt-[7rem] font-semibold">Total: <span><i className="fa fa-indian-rupee-sign"></i>{totalPrice}</span></h3>
                    <div className='button-container flex flex-col items-center justify-center'>
                        <button className="btn p-3 text-white rounded-lg text-3xl mt-5" onClick={handleCheckout}>Checkout Cart</button>
                        {checkoutMessage && <p className="checkout-message mt-4 normal-case text-3xl text-center">{checkoutMessage}</p>}
                    </div>

                </section>
            )}
        </div>
    );
}

export default Cart;

