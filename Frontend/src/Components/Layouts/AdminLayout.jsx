import React from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const AdminLayout = () => {
    const { user } = useAuth();
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />
    }
    return (
        <div className="flex text-2xl">
            <nav className="fixed  w-64 bg-gray-800 min-h-screen pt-32 pl-4 ">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/reviews"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/fruits"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Fruits
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/blogs"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/gallery"
                            className={({ isActive }) =>
                                `block text-white py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                            }
                        >
                            Gallery
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="min-h-screen flex-1 p-8 bg-white pt-32 ml-60">
                <div className="mb-8 flex justify-center ">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                </div>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
