import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

const BookDetail = ({id, loggedUser}) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {

        axios.get(`/books/${id}`)
            .then(response => {
                setBook(response.data.payload);
                const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
                setIsInCart(cart.includes(id));
            })
            .catch(error => {
                console.error('Error loading book:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!book) {
        return <div>Kniha nenalezena</div>;
    }

    const addToCart = (id) => {
        let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        if (!cart.includes(id)) {
            cart.push(id);
            Cookies.set('cart', JSON.stringify(cart), { expires: 1/24 }); // 1 hour
            localStorage.setItem("toast", "Kniha byla přidána do košíku");
            window.location.reload();
        }
    };

    return (
        <BookContainer>
            <BookImage src={book.coverImageLink} alt={book.title} />
            <BookDetails>
                <div>
                    <TitleAuthor>
                        <BookTitle>{book.title}</BookTitle>
                        <AuthorLink href={`/authors/${book.author.id}`}>
                            {book.author.firstName} {book.author.lastName}
                        </AuthorLink>
                    </TitleAuthor>
                    <div>
                        <BookInfo>Žánr: {book.genre.label}</BookInfo>
                        <BookInfo>Jazyk: {book.language.label}</BookInfo>
                        <BookInfo>Počet stran: {book.pages}</BookInfo>
                        <BookInfo>Publikováno: {book.publicationYear}</BookInfo>
                    </div>
                </div>
                <div>
                    {book.available && <BookInfo>Skladem kusů: {book.availableQuantity}</BookInfo>}
                    {!book.available && <BookInfo>Vypůjčeno</BookInfo>}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!book.available || isInCart || !loggedUser}
                        onClick={() => addToCart(book.id)}
                    >
                        {loggedUser ? isInCart ? 'Kniha je již v košíku' : 'Přidat do košíku' : 'Pro přidání knihy do košíku je nutné se přihlásit'}
                    </Button>
                </div>
            </BookDetails>
        </BookContainer>
    );
};

BookDetail.propTypes = {
    id: PropTypes.number.isRequired,
    loggedUser: PropTypes.object,
};

export default BookDetail;

const BookContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 2em;
    @media (min-width: 768px) {
        flex-direction: row;
        gap: 5em;
    }
`;

const BookImage = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
`;

const BookDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
    margin-bottom: 10px;
    @media (min-width: 768px) {
        margin-bottom: 0;
        height: 300px;
    }
`;

const BookTitle = styled.h2`
    margin: 0 0 10px 0;
`;

const TitleAuthor = styled.div`
    margin-bottom: 20px;
`;

const BookInfo = styled.p`
    margin: 5px 0;
`;

const AuthorLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
