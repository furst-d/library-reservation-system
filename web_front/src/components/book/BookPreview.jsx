import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";

const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    margin: 10px;
`;

const BookImage = styled.img`
  width: 200px;
  height: 300px;
  margin-bottom: 10px;
`;

const BookPreview = ({id, title, authorId, authorFirstName, authorLastName, coverImageLink}) => {
    return (
        <BookContainer>
            <NavLink to={`/books/${id}`}><BookImage src={coverImageLink} alt={title} /></NavLink>
            <NavLink to={`/books/${id}`}>{title}</NavLink>
            <NavLink to={`/authors/${authorId}`}>{authorFirstName} {authorLastName}</NavLink>
        </BookContainer>
    );
};

BookPreview.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    authorFirstName: PropTypes.string.isRequired,
    authorLastName: PropTypes.string.isRequired,
    coverImageLink: PropTypes.string.isRequired,
};

export default BookPreview;
