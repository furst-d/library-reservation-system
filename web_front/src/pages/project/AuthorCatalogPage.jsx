import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AuthorCatalogPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Seznam autorů</title>
            </Helmet>
            <div>
                Nějaký autor
            </div>
        </HelmetProvider>
    );
};

export default AuthorCatalogPage;
