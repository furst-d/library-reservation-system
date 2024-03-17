import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const BookCatalogPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Seznam knih</title>
            </Helmet>
            <div>
                Nějaká kniha
            </div>
        </HelmetProvider>
    );
};

export default BookCatalogPage;
