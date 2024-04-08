import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthorCatalog from "../../components/author/AuthorCatalog";

const AuthorCatalogPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Seznam autorů</title>
            </Helmet>
            <AuthorCatalog />
        </HelmetProvider>
    );
};

export default AuthorCatalogPage;
