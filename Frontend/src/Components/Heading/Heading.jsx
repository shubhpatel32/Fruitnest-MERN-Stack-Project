import React from 'react'
import { Link } from 'react-router-dom'

function Heading({ name1, name2 }) {
    return (
        <div>
            <div className="heading bg-cover bg-center bg-no-repeat text-center pt-48 pb-32" style={{ backgroundImage: `url('/SliderImages/gradientbg.jpg')` }}>
                <h1 className="text-black text-[4rem] font-semibold">{name1}</h1>
                <p className="pt-2 text-3xl text-black font-bold">
                    <Link to="/" className="text-black pr-2 hover:text-red-700">Home</Link>
                    <span className="hover:text-black">{">>"}</span> {name2}
                </p>
            </div>
        </div>
    )
}

export default Heading
