import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [gallery, setGallery] = useState([]);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;

    const logoutUser = () => {
        setToken('');
        localStorage.removeItem('token');
    };


    const userAuthentication = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch("http://localhost:5000/api/auth/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data:", data)
                    setUser(data.userData);
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    const getReviews = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/review", {
                method: "GET",
            })

            if (response.ok) {
                const reviews = await response.json();
                console.log("reviews:", reviews);
                setReviews(reviews);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getBlogs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/blog", {
                method: "GET",
            })

            if (response.ok) {
                const blogs = await response.json();
                console.log("blogs:", blogs);
                setBlogs(blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getGallery = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/gallery", {
                method: "GET",
            })

            if (response.ok) {
                const gallery = await response.json();
                console.log("gallery:", gallery);
                setGallery(gallery);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogs();
        getReviews();
        getGallery();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user, reviews, blogs, gallery }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
