import React from 'react';
import PropTypes from "prop-types";
import BookRecommendationPreview from "./BookRecommendationPreview";
import styled from "styled-components";
import BookPreview from "./BookPreview";

const BookRecommendation = ({title, books}) => {
    return (
        <BookRecommendationPreviewStyle>
            <h3>{title}</h3>
            <BookRecommendationWrapperStyle>
                {books.map(book => (
                    <BookRecommendationPreview
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        authorId={book.author.id}
                        authorFirstName={book.author.firstName}
                        authorLastName={book.author.lastName}
                        coverImageLink={book.coverImageLink} />
                ))}
            </BookRecommendationWrapperStyle>
        </BookRecommendationPreviewStyle>
    );
};

BookRecommendation.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
};

export default BookRecommendation;

const BookRecommendationWrapperStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const BookRecommendationPreviewStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;
