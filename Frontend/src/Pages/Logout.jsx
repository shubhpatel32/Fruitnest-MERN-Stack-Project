import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Logout = () => {

    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
    }, [logoutUser]);

    return <Navigate to="/" />

}

export default Logout
