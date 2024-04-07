import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios, {axiosPrivate} from "../../api/axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import {Dialog} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const ShoppingCart = () => {
    const [books, setBooks] = useState([]);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const navigate = useNavigate();

    const removeFromCart = (bookId) => {
        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
        const updatedCartItems = cartItems.filter(id => id !== bookId);
        Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 1 });
        window.location.reload();
    };

    const createReservation = () => {
        console.log()
        axiosPrivate.post(`/profile/reservations`, {
            bookIds: books.map(book => book.id)
        })
            .then(res => {
                toast.success("Rezervace byla úspěšně vytvořena");
                Cookies.remove('cart');
                navigate("/profile/reservations");
            })

            .catch((error) => {
                if(error.response) {
                    if (error.response.status === 409) {
                        const data = error.response.data.payload.data;
                        console.log(data);
                        localStorage.setItem("toast-error", "Kniha '" + data.title + "' již není k dispozici");
                        removeFromCart(data.id);
                    } else {
                        toast.error("Při zpracování rezervace došlo k chybě");
                    }
                }
            });
        setOpenConfirmModal(false);
    }

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
                    <RemoveButton onClick={() => {
                        localStorage.setItem("toast", "Kniha byla odebrána z košíku");
                        removeFromCart(book.id);
                    }}>Odstranit</RemoveButton>
                </ListItem>
            ))}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpenConfirmModal(true)}
            >
                Zarezervovat
            </Button>
            <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete vytvořit rezervaci?`} onAccept={createReservation} onClose={() => setOpenConfirmModal(false)} />
            </Dialog>
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