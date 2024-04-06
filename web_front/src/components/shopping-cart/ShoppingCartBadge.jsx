import React from 'react';
import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Badge} from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const ShoppingCartBadge = () => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/shopping-cart");
    };
    const getCartItemCount = () => {
        const cart = Cookies.get('cart');
        if (cart) {
            const cartItems = JSON.parse(cart);
            return cartItems.length;
        }
        return 0;
    };

    return (
        <CustomBadge color="primary" badgeContent={getCartItemCount()}  max={999} onClick={handleCartClick}>
            <ShoppingCartIcon />
        </CustomBadge>
    );
};

export default ShoppingCartBadge;

const CustomBadge = styled(Badge)`
  font-size: 50px;
  cursor: pointer;
  margin-bottom: -5px;  
`
