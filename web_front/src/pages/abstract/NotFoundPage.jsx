import React from 'react';
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {ContentStyle} from "../../components/styles/content/Content";

const NotFoundPage = props => {
    return (
        <ContentStyle>
            <Helmet>
                <title>Stránka nenalezena</title>
            </Helmet>
            Nenalezeno
        </ContentStyle>
    );
};

export default NotFoundPage;
