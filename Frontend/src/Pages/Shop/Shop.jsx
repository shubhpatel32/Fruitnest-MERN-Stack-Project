import React, { useEffect, useState } from 'react';
import Heading from '../../Components/Heading/Heading';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


function Shop() {

    const { shopItems, cartItems, addToCart } = useCart();
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(shopItems);


    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilteredItems(
                shopItems.filter((fruit) =>
                    fruit.name.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, shopItems]);


    const navigate = useNavigate();

    return (
        <div className='min-h-screen'>
            <Heading name1="Our Shop" name2="Shop" />

            <section className=" flex justify-end text-3xl">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-2 py-2 rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case w-full sm:w-1/3 md:w-1/4 "
                />
            </section>


            {filteredItems.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-2">
                    {filteredItems.map((fruit, index) => (
                        <div key={index} id={fruit._id} className="box flex flex-col justify-between text-center h-[30rem] md:h-[35rem] w-full overflow-hidden shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
                            <div className="image bg-white h-[20rem] w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${fruit.image})` }}></div>
                            <div className="p-4 justify-center">
                                <h3 className="text-3xl font-semibold">{fruit.name}</h3>
                                <div className="price font-bold text-[1.8rem] text-black py-4">&#8377;{fruit.price}</div>
                                <div className='addtocart items-center'>
                                    <button className="btn rounded bg-[#ff9421] text-white py-2 px-4 justify-center items-center" onClick={() => { isLoggedIn ? addToCart(fruit._id) : navigate("/login") }} >Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <section className="p-4 flex justify-center text-4xl normal-case">No items match your search.</section>
            )}
        </div>
    );
};

export default Shop;
