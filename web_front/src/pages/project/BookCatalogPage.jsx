import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookCatalog from "../../components/book/BookCatalog";
import BookRecommendations from "../../components/book/BookRecommendations";
import styled from "styled-components";

const BookCatalogPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Seznam knih</title>
            </Helmet>
            <BookWrapperStyle>
                <BookRecommendations />
                <BookCatalog />
            </BookWrapperStyle>
        </HelmetProvider>
    );
};

export default BookCatalogPage;

const BookWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;
