import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import PersonIcon from '@mui/icons-material/Person';
import styled from "styled-components";
import {formatDate} from "../../utils/date/dateFormatter";
import BookPreview from "../book/BookPreview";
import DataGrid from "../data-grid/DataGrid";

const AuthorDetail = ({ id }) => {
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        axios.get(`/authors/${id}`)
            .then(response => {
                setAuthor(response.data.payload);
                console.log(response.data.payload);
                axios.get(`/books`, {
                    params: {
                        page: page,
                        size: LIMIT,
                        filters: encodeURIComponent(JSON.stringify([
                            {
                                name: 'authorId',
                                value: id
                            }
                        ]))
                    }
                }).then(response => {
                    setBooks(response.data.payload.data);
                    setTotalRecords(response.data.payload.totalCount);
                })
                    .catch(error => {
                        console.error('Error loading books:', error);
                    });
            })
            .catch(error => {
                console.error('Error loading book:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, page]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!author) {
        return <div>Autor nenalezen</div>;
    }

    return (
        <ContentContainer>
            <AuthorContainer>
                <AuthorIcon fontSize="0" />
                <AuthorDetails>
                    <AuthorName>{author.firstName} {author.lastName}</AuthorName>
                    <AuthorInfo>Datum narození: {formatDate(author.birthDate)}</AuthorInfo>
                    <AuthorInfo>Národnost: {author.nationality}</AuthorInfo>
                </AuthorDetails>
            </AuthorContainer>
            <div>
                <h3>Seznam knih</h3>
                <DataGrid
                    data={books}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                    pageSize={LIMIT}
                    currentPage={page + 1}
                    totalPages={Math.ceil(totalRecords / LIMIT)}
                    renderType="flex"
                    renderRow={(row) => (
                        <BookPreview
                            id={row.id}
                            title={row.title}
                            authorId={row.author.id}
                            authorFirstName={row.author.firstName}
                            authorLastName={row.author.lastName}
                            coverImageLink={row.coverImageLink}
                        />
                    )}
                />
            </div>
        </ContentContainer>
    );
};

AuthorDetail.propTypes = {
    id: PropTypes.number.isRequired
};

export default AuthorDetail;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`

const AuthorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    @media (min-width: 768px) {
        flex-direction: row;
        gap: 5em;
    }
`;

const AuthorIcon = styled(PersonIcon)`
    font-size: 300px;
    color: ${p => p.theme.bg};
`;

const AuthorDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const AuthorName = styled.h2`
    margin: 0 0 10px 0;
`;

const AuthorInfo = styled.p`
    margin: 5px 0;
`;
