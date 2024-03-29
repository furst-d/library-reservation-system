import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BookCatalog from "../../components/book/BookCatalog";

const BookCatalogPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Seznam knih</title>
            </Helmet>
            <BookCatalog />
        </HelmetProvider>
    );
};

export default BookCatalogPage;
