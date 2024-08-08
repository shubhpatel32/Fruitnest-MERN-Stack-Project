import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [orders, setOrders] = useState([]);

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
                const response = await fetch("https://fruitnest-backend.vercel.app/api/auth/user", {
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




    const getOrders = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch("https://fruitnest-backend.vercel.app/api/order/show", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const orders = await response.json();
                    console.log("orders:", orders);
                    setOrders(orders);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getOrders();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user, orders }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
