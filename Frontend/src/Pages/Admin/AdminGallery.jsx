import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminGallery = () => {
    const { authorizationToken } = useAuth();
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(gallery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFiltered(
                gallery.filter((item) =>
                    item._id.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
                )
            );
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, gallery]);

    const getAllGalleryItems = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/gallery`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setGallery(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteGalleryItem = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this gallery item?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/gallery/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getAllGalleryItems();
                toast.success("Gallery item deleted successfully");
            } else {
                toast.error("Error in deleting gallery item");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllGalleryItems();
    }, []);

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end text-2xl mb-4">
                <div className="border border-solid border-gray-700 flex w-1/4 p-2">
                    <i className="fa fa-search flex items-center mr-0 text-gray-700"></i>
                    <input
                        type="text"
                        placeholder="Search by Id"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-4 py-2 rounded bg-transparent normal-case w-full"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className='bg-gray-400 border-b border-gray-700'>
                            <th className='py-3 px-4 text-left'>Id</th>
                            <th className='py-3 px-4 text-left'>Image</th>
                            <th className="py-3 px-4 text-left ">Edit</th>
                            <th className="py-3 px-4 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4 normal-case"><Skeleton width={60} height={20} /></td>
                                    <td className="py-3 px-4">
                                        <Skeleton width={112} height={112} />
                                    </td>
                                    <td className="py-3 px-4 normal-case"><Skeleton width={60} height={20} /></td>
                                    <td className="py-3 px-4 normal-case"><Skeleton width={60} height={20} /></td>
                                </tr>
                            ))
                        ) : (
                            filtered.map((item, index) => (
                                <tr key={index} className="border border-solid">
                                    <td className="py-3 px-4 normal-case"> {item._id}</td>
                                    <td className="py-3 px-4">
                                        {item.path && (
                                            <img src={item.path} alt="" className="w-[7rem] h-[7rem] object-contain" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 normal-case"><button className='border-solid border-gray-400 hover:border-gray-600 p-1 rounded-lg'>Edit</button></td>
                                    <td className="py-3 px-4 normal-case"><button onClick={() => deleteGalleryItem(item._id)} className='border-solid border-gray-400 hover:border-gray-600 p-1 rounded-lg'>Delete</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminGallery;