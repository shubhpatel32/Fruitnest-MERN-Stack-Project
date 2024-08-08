import { useAuth } from '../../Context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4  min-h-screen pt-52">
            <section className=" mx-auto bg-white rounded border border-solid border-[#a8a297] p-12 sm:w-1/2 w-4/5">
                <h2 className="text-5xl font-bold mb-6 text-center">Prof ile</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <form className="text-3xl ">
                            <div className="mb-7">
                                <label htmlFor="username" className="font-medium">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    readOnly
                                    className="box p-2 w-full rounded border border-solid border-[#a8a297] bg-transparent normal-case mb-4"
                                    value={user?.username || 'N/A'}
                                />
                            </div>
                            <div className="mb-7">
                                <label htmlFor="email" className="font-medium">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    readOnly
                                    className="box p-2 w-full rounded border border-solid border-[#a8a297] bg-transparent normal-case mb-4"
                                    value={user?.email || 'N/A'}
                                />
                            </div>
                            <div className="mb-7">
                                <label htmlFor="phone" className="font-medium">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    readOnly
                                    className="box p-2 w-full rounded border border-solid border-[#a8a297] bg-transparent normal-case mb-4"
                                    value={user?.phone || 'N/A'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
