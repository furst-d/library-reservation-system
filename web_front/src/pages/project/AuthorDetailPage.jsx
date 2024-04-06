import React from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";
import {useParams} from "react-router-dom";
import AuthorDetail from "../../components/author/AuthorDetail";

const AuthorDetailPage = () => {
    const { id } = useParams();
    return (
        <HelmetProvider>
            <Helmet>
                <title>Detail autora - {id}</title>
            </Helmet>
            <AuthorDetail id={parseInt(id)} />
        </HelmetProvider>
    );
};

export default AuthorDetailPage;
