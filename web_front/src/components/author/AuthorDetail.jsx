import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import styled from "styled-components";
import {formatDate} from "../../utils/date/dateFormatter";
import BookPreview from "../book/BookPreview";
import DataGrid from "../data-grid/DataGrid";
import {ProfileContainer, ProfileIcon, ProfileInfo, ProfileInfoSection, ProfileName} from "../styles/profile/Profile";

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
            <ProfileContainer>
                <ProfileIcon fontSize="0" />
                <ProfileInfoSection>
                    <ProfileName>{author.firstName} {author.lastName}</ProfileName>
                    <ProfileInfo>Datum narození: {formatDate(author.birthDate)}</ProfileInfo>
                    <ProfileInfo>Národnost: {author.nationality.label}</ProfileInfo>
                </ProfileInfoSection>
            </ProfileContainer>
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
