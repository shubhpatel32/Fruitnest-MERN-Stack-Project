import React, { useEffect } from 'react';
import Fruits from './Fruits';
import Heading from '../../Components/Heading/Heading';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';


function Shop() {

    const { shopItems, cartItems, addToCart, token } = useCart();

    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);

    const navigate = useNavigate();

    return (
        <div>
            <Heading name1="Our Shop" name2="Shop" />
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-2">
                {shopItems.map((fruit, index) => (
                    <div key={index} id={fruit._id} className="box flex flex-col justify-between text-center h-[30rem] md:h-[35rem] w-full overflow-hidden shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
                        <div className="image bg-white h-[20rem] w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${fruit.image})` }}></div>
                        <div className="p-4 justify-center">
                            <h3 className="text-3xl font-semibold">{fruit.name}</h3>
                            <div className="price font-bold text-[1.8rem] text-black py-4">&#8377;{fruit.price}</div>


                            {/* <div class="flex items-center justify-center w-full ">
        
                            <button type="button" id="decrement-button" className="bg-gray-200  hover:bg-gray-200 border border-gray-800 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none mx-4">
                                <div class="w-3 h-3 text-black">-</div>
                            </button>
        
                            <div className="bg-gray-50 border-x-0 border-gray-800 h-11 text-center text-black text-sm mx-4">{fruit.quantity}</div>
        
                            <button type="button" id="increment-button" className="bg-gray-200  hover:bg-gray-200 border border-gray-800 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none mx-4">
                                <div class="w-3 h-3 text-black">+</div>
                            </button>
        
                        </div> */}


                            {/* <div className="quantity-control text-[1.8rem]">
                                <button className="w-[2.5rem] h-[2.5rem] m-4 bg-white border  border-solid border-[#a8a297] hover:border-black" onClick={() => removeFromCart(fruit._id)}>-</button>
                                <span>{cartItems[fruit._id] ? cartItems[fruit._id] : 0} kg</span>
                                <button className="w-[2.5rem] h-[2.5rem] m-4 bg-white border border-solid border-[#a8a297] hover:border-black" onClick={() => addToCart(fruit._id)}>+</button>
                            </div> */}

                            <div className='addtocart items-center'>
                                <button className="btn rounded bg-[#ff9421] text-white py-2 px-4 justify-center items-center" onClick={() => { token ? addToCart(fruit._id) : navigate("/login") }} >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Shop;
