import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const BookRecommendationPreview = ({id, title, authorId, authorFirstName, authorLastName, coverImageLink}) => {
    return (
        <BookContainer>
            <NavLink to={`/books/${id}`}><BookImage src={coverImageLink} alt={title} /></NavLink>
            <NavLink to={`/books/${id}`}>{title}</NavLink>
            <NavLink to={`/authors/${authorId}`}>{authorFirstName} {authorLastName}</NavLink>
        </BookContainer>
    );
};

BookRecommendationPreview.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    authorFirstName: PropTypes.string.isRequired,
    authorLastName: PropTypes.string.isRequired,
    coverImageLink: PropTypes.string.isRequired,
};

export default BookRecommendationPreview;

const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 330px;
    margin: 10px;
`;

const BookImage = styled.img`
    width: 200px;
    height: 300px;
`;