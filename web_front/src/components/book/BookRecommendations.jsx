import React, {useEffect, useState} from 'react';
import BookRecommendation from "./BookRecommendation";
import axios, {axiosPrivate} from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import styled from "styled-components";

const BookRecommendations = () => {
    const [loading, setLoading] = useState(true);

    const [genreBasedRecommendations, setGenreBasedRecommendations] = useState([]);
    const [authorBasedRecommendations, setAuthorBasedRecommendations] = useState([]);
    const [topBooks, setTopBooks] = useState([]);

    useEffect(() => {
        axiosPrivate.get(`/profile/recommend`)
            .then(response => {
                const data = response.data.payload;
                setGenreBasedRecommendations(data.genreBasedRecommendations);
                setAuthorBasedRecommendations(data.authorBasedRecommendations);
                setTopBooks(data.topBooks);
        }).catch(error => {
            console.error('Error loading recommendations:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <BookRecommendationWrapperStyle>
                    <BookRecommendation title={"Doporučené knihy podle žánru"} books={genreBasedRecommendations} />
                    <BookRecommendation title={"Doporučené knihy podle autora"} books={authorBasedRecommendations} />
                    <BookRecommendation title={"Nejpopulárnější knihy"} books={topBooks} />
                </BookRecommendationWrapperStyle>
            )}
        </>
    );
};

export default BookRecommendations;

const BookRecommendationWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
`;
