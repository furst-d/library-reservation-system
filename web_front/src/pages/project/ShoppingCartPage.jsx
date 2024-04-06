import React, {useEffect} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../../utils/auth/authManager";
import ShoppingCart from "../../components/shopping-cart/ShoppingCart";

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!checkAuth()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Košík</title>
            </Helmet>
            <ShoppingCart />
        </HelmetProvider>
    );
};

export default ProfilePage;