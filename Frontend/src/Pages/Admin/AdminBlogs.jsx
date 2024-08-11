import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AdminBlogs = () => {
    const { authorizationToken } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getAllBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/blogs`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBlog = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiUrl}/admin/blogs/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getAllBlogs();
                toast.success("Blog deleted successfully");
            } else {
                toast.error("Error in deleting blog");
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className="p-4 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
                    <thead>
                        <tr className='bg-gray-400 border-b border-gray-700'>
                            <th className='py-3 px-4 text-left w-1/4'>Title</th>
                            <th className='py-3 px-4 text-left w-1/4'>Description</th>
                            <th className='py-3 px-4 text-left'>Image</th>
                            <th className='py-3 px-4 text-left'>Author</th>
                            <th className='py-3 px-4 text-left'>Date</th>
                            <th className="py-3 px-4 text-left ">Edit</th>
                            <th className="py-3 px-4 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={index} className="border border-solid">
                                <td className="py-3 px-4 text-left normal-case">{blog.title}</td>
                                <td className="py-3 px-4 text-left normal-case">{blog.description}</td>
                                <td className="py-3 px-4">
                                    {blog.image && (
                                        <div
                                            className="w-[5rem] h-[5rem] bg-contain bg-center bg-no-repeat"
                                            style={{ backgroundImage: `url(/${blog.image})` }}
                                        ></div>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left normal-case">{blog.author}</td>
                                <td className="py-3 px-4 text-left normal-case">{blog.date}</td>
                                <td className="py-3 px-4 normal-case"><button className='border-solid border-gray-400  hover:border-gray-600 p-1 rounded-lg'>Edit</button></td>
                                <td className="py-3 px-4 normal-case"><button onClick={() => deleteBlog(blog._id)} className='border-solid border-gray-400  hover:border-gray-600 p-1 rounded-lg'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBlogs;



// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../Context/AuthContext';


// const AdminBlogs = () => {
//     const { authorizationToken } = useAuth();
//     const [blogs, setBlogs] = useState([]);
//     const apiUrl = import.meta.env.VITE_API_URL;


//     const getAllBlogs = async () => {
//         try {
//             const response = await fetch(`${apiUrl}/admin/blogs`, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: authorizationToken,
//                 }
//             })

//             const data = await response.json();
//             setBlogs(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         getAllBlogs();
//     }, [])
//     return (
//         <div className="p-4 bg-white">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white normal-case border border-gray-700 border-solid">
//                     <thead>
//                         <tr className='bg-gray-400 border-b border-gray-700'>
//                             <th className='py-3 px-4 text-left'>Title</th>
//                             <th className='py-3 px-4 text-left'>Description</th>
//                             <th className='py-3 px-4 text-left'>Image</th>
//                             <th className='py-3 px-4 text-left'>Author</th>
//                             <th className='py-3 px-4 text-left'>Date</th>
//                             <th className="py-3 px-4 text-left ">Edit</th>
//                             <th className="py-3 px-4 text-left ">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {blogs.map((blog, index) => (
//                             <tr key={index} className="border border-solid">
//                                 <td className="py-3 px-4 text-left normal-case">{blog.title}</td>
//                                 <td className="py-3 px-4 text-left normal-case">{blog.description}</td>
//                                 <td className="py-3 px-4">
//                                     <div className="w-[5rem] h-[5rem] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/${blog.image})` }}></div>
//                                 </td>
//                                 <td className="py-3 px-4 text-left normal-case">{blog.author}</td>
//                                 <td className="py-3 px-4 text-left normal-case">{blog.date}</td>
//                                 <td className="py-3 px-4 normal-case">Edit</td>
//                                 <td className="py-3 px-4 normal-case">Delete</td>


//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default AdminBlogs
