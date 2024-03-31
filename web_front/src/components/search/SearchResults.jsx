import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import DataGrid from "../data-grid/DataGrid";
import BookPreview from "../book/BookPreview";
import PropTypes from "prop-types";

const SearchResults = ({phrase}) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        axios.get(`/books/search`, {
            params: {
                phrase: phrase,
                page: page,
                size: LIMIT,
            }
        }).then(response => {
            const booksLoc = response.data.payload.data;
            if (JSON.stringify(booksLoc) !== JSON.stringify(books)) {
                setBooks(response.data.payload.data);
                setTotalRecords(response.data.payload.totalCount);
            }
        }).catch(error => {
            console.error('Error loading books:', error);
        }).finally(() => {
            setLoading(false);
        });

    }, [books, page, phrase]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
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
            )}
        </>
    );
};

SearchResults.propTypes = {
    phrase: PropTypes.string.isRequired,
};

export default SearchResults;