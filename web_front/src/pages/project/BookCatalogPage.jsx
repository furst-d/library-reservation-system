import React from 'react';
import {Helmet} from "react-helmet";

const BookCatalogPage = props => {
    return (
        <>
            <Helmet>
                <title>Seznam knih</title>
            </Helmet>
            <div>
                Nějaká kniha
            </div>
        </>
    );
};

export default BookCatalogPage;
