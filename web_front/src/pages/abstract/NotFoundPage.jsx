import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {ContentStyle} from "../../components/styles/content/Content";

const NotFoundPage = () => {
    return (
        <HelmetProvider>
            <ContentStyle>
                <Helmet>
                    <title>Stránka nenalezena</title>
                </Helmet>
                Nenalezeno
            </ContentStyle>
        </HelmetProvider>
    );
};

export default NotFoundPage;
