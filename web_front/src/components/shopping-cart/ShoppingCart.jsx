import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";

const ShoppingCart = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const cart = Cookies.get('cart');
        if (cart) {
            const cartItems = JSON.parse(cart);
        }
    }, []);

    return (
        <h2>Košík</h2>
    );
};

export default ShoppingCart;
