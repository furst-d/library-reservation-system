import React from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";
import BookDetail from "../../components/book/BookDetail";
import {useParams} from "react-router-dom";

const BookDetailPage = () => {
    const { id } = useParams();
    return (
        <HelmetProvider>
            <Helmet>
                <title>Detail knihy - {id}</title>
            </Helmet>
            <BookDetail id={parseInt(id)} />
        </HelmetProvider>
    );
};

export default BookDetailPage;
