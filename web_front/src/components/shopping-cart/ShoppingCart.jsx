import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios from "../../api/axios";
import styled from "styled-components";
import Button from "@mui/material/Button";

const ShoppingCart = () => {
    const [books, setBooks] = useState([]);

    const removeFromCart = (bookId) => {
        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
        const updatedCartItems = cartItems.filter(id => id !== bookId);
        Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 1 });
        localStorage.setItem("toast", "Kniha byla odebrána z košíku");
        window.location.reload();
    };

    useEffect(() => {
        const cart = Cookies.get('cart');
        if (cart) {
            const cartItems = JSON.parse(cart);
            axios.get(`/books`, {
                params: {
                    filters: encodeURIComponent(JSON.stringify([
                        {
                            name: 'bookIds',
                            value: JSON.stringify(cartItems)
                        }
                    ]))
                }
            }).then(response => {
                setBooks(response.data.payload.data);
            })
            .catch(error => {
                console.error('Error loading books:', error);
            });
        }
    }, []);

    return (
        books.length === 0 ? <div>Košík je prázdný</div> :
        <ShoppingCartContainer>
            <h2>Košík</h2>
            {books.map(book => (
                <ListItem key={book.id}>
                    <ItemDetails>
                        <img src={book.coverImageLink} alt={book.title} width="50" height="75"/>
                        <ItemTitle>{book.title}</ItemTitle>
                    </ItemDetails>
                    <RemoveButton onClick={() => removeFromCart(book.id)}>Odstranit</RemoveButton>
                </ListItem>
            ))}
            <Button
                variant="contained"
                color="primary"
                size={'large'}
            >
                Zarezervovat
            </Button>
        </ShoppingCartContainer>
    );
};

export default ShoppingCart;

const ShoppingCartContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    
    button {
        width: 200px;
    }
`;

const RemoveButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #d32f2f;
    }
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;

    &:last-child {
        border-bottom: none;
    }
`;

const ItemDetails = styled.div`
    display: flex;
    align-items: center;
`;

const ItemTitle = styled.span`
    margin-left: 10px;
`;