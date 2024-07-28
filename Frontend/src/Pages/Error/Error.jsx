import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <section className="content px-10 py-40 text-center">
                <h1 className="text-8xl font-bold mt-8 text-[#cf1a1a]">4<span className="text-[#ff9421]">0</span>4</h1>
                <h2 className="text-4xl mt-8">Sorry! Page not found</h2>
                <p className="text-2xl mt-8">
                    Oops! It seems like the page you are trying to access doesn't exist.
                </p>
                <div className="mt-8">
                    <Link to='/' className="btn">Back to Home</Link>

                </div>
            </section>
        </div>
    )
}

export default Error
