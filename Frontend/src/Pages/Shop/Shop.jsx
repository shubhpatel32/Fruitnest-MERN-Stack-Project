import React, { useEffect, useState } from 'react';
import Heading from '../../Components/Heading/Heading';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Shop() {
    const { shopItems, cartItems, addToCart } = useCart();
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(shopItems);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (shopItems.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [shopItems]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilteredItems(
                shopItems.filter((fruit) =>
                    fruit.name.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, shopItems]);

    return (
        <div className='min-h-screen'>
            <Heading name1="Our Shop" name2="Shop" />

            <section className="flex justify-end text-3xl mb-4">
                <div className="border border-solid border-[#a8a297] flex w-full sm:w-1/3 md:w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-2 text-[#a8a297]"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-2 rounded bg-transparent normal-case w-full"
                    />
                </div>
            </section>

            {loading ? (
                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-2">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="box flex flex-col justify-between text-center h-[30rem] md:h-[35rem] w-full overflow-hidden shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">
                            <Skeleton height={200} width="100%" />
                            <div className="p-4 justify-center">
                                <Skeleton height={30} width="60%" />
                                <Skeleton height={20} width="40%" className="my-4" />
                                <Skeleton height={40} width="80%" />
                            </div>
                        </div>
                    ))}
                </section>
            ) : filteredItems.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:grid-cols-2">
                    {filteredItems.map((fruit, index) => (
                        <div key={index} id={fruit._id} className="box flex flex-col justify-between items-center text-center h-[30rem] md:h-[35rem] w-full overflow-hidden shadow-[0.1rem_0.2rem_0.2rem_0.1rem_#a8a297] hover:shadow-[0.3rem_0.5rem_0.5rem_0.3rem_#a8a297]">

                            <img src={fruit.image} alt="Fruit" className="bg-white h-[16rem] md:h-[20rem] w-full object-contain" />

                            <div className="p-4 justify-center">
                                <h3 className="text-3xl font-semibold">{fruit.name}</h3>
                                <div className="price font-bold text-[1.8rem] text-black py-4">&#8377;{fruit.price}</div>
                                {
                                    fruit.stock <= 0 ?
                                        (<div className="text-[#cf1a1a] mt-8 text-4xl normal-case font-bold py-2 px-4 inline-block justify-center items-center">Out of Stock</div>)
                                        :
                                        (<div className='addtocart items-center'>
                                            <button className="btn rounded  text-white py-2 px-4 justify-center items-center" onClick={() => { isLoggedIn ? addToCart(fruit._id) : navigate("/login") }}>Add to Cart</button>
                                        </div>)
                                }

                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <section className="p-4 flex justify-center text-4xl normal-case">No items match your search.</section>
            )}
        </div>
    );
}

export default Shop;
