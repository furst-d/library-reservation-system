import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import PropTypes from "prop-types";

const BookDetail = ({ id }) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/books/${id}`)
            .then(response => {
                setBook(response.data.payload);
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
                        <BookInfo>Žánr: {book.genre}</BookInfo>
                        <BookInfo>Jazyk: {book.language}</BookInfo>
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
                        disabled={!book.available}
                    >
                        Přidat do košíku
                    </Button>
                </div>
            </BookDetails>
        </BookContainer>
    );
};

BookDetail.propTypes = {
    id: PropTypes.number.isRequired,
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
