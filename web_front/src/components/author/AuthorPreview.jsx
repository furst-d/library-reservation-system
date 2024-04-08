import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";

const AuthorPreview = ({id, name, lastName}) => {
    return (
        <AuthorContainer>
            <NavLink to={`/authors/${id}`}><AuthorIcon fontSize="0" /></NavLink>
            <NavLink to={`/authors/${id}`}>{name} {lastName}</NavLink>
        </AuthorContainer>
    );
};

AuthorPreview.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
};

export default AuthorPreview;

const AuthorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`;

const AuthorIcon = styled(PersonIcon)`
    font-size: 150px;
    color: ${p => p.theme.bg};
`;
