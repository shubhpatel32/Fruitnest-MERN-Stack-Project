import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const authorizationToken = `Bearer ${token}`;

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
                setLoading(true);
                const response = await fetch(`${apiUrl}/auth/user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("data:", data)
                    setUser(data.userData);
                    setLoading(false)
                } else {
                    console.error("Error fetching user data");
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    const getOrders = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch(`${apiUrl}/order/show`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
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
    }, [isLoggedIn, token]);

    // useEffect(() => {
    //     getOrders();
    // }, [orders])




    return (
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user, orders, addOrder, authorizationToken, loading, setUser, getOrders }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
