import React from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";
import BookDetail from "../../components/book/BookDetail";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

const BookDetailPage = ({loggedUser}) => {
    const { id } = useParams();
    return (
        <HelmetProvider>
            <Helmet>
                <title>Detail knihy - {id}</title>
            </Helmet>
            <BookDetail id={parseInt(id)} loggedUser={loggedUser} />
        </HelmetProvider>
    );
};

export default BookDetailPage;

BookDetailPage.propTypes = {
    loggedUser: PropTypes.object.isRequired,
};
