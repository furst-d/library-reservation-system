import React, {useEffect, useState} from 'react';
import axios from "../../api/axios";
import DataGrid from "../data-grid/DataGrid";
import Filter from "../data-grid/Filter";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import useFilter from "../../hooks/useFilter";

const BookCatalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [totalRecords, setTotalRecords] = useState(0);
    const LIMIT = 10;

    const initialFilters = [
        { name: 'title', type: 'text', value: '', placeholder: 'Název knihy' },
        { name: 'author', type: 'text', value: '', placeholder: 'Jméno autora' },
        { name: 'inStock', type: 'checkbox', value: true, placeholder: 'Skladem' }
    ];

    const [apiFilters, updateFilters] = useFilter(initialFilters);

    const columns = [
        { header: 'Název knihy', accessor: 'title' },
        { header: 'Příjmení autora', accessor: 'authorLastName' },
        { header: 'Rok vydání', accessor: 'publicationYear' },
    ];

    const sortOptions = [
        {
            name: 'sortBy',
            label: 'Řadit dle',
            values: [
                { value: 'title', label: 'Název' },
                { value: 'authorLastName', label: 'Příjmení autora' },
            ],
        },
        {
            name: 'sortDir',
            label: 'Směr řazení',
            values: [
                { value: 'asc', label: 'Vzestupně' },
                { value: 'desc', label: 'Sestupně' },
            ],
        },
    ];

    useEffect(() => {
        axios.get(`/books`, {
            params: {
                page: page,
                size: LIMIT,
                sortBy: sortBy,
                sortDir: sortDir,
                filters: encodeURIComponent(JSON.stringify(apiFilters))
            }
        }).then(response => {
            const booksLoc = response.data.payload.data;
            if (JSON.stringify(booksLoc) !== JSON.stringify(books)) {
                setBooks(booksLoc);
                setTotalRecords(response.data.payload.totalCount);
            }
        }).catch(error => {
            console.error('Error loading books:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [apiFilters, books, page, sortBy, sortDir]);

    const handleFilterChange = (newFilters) => {
        updateFilters(newFilters);
        setPage(0);
    };

    const handleSortChange = (sortField, sortOrder) => {
        setSortBy(sortField);
        setSortDir(sortOrder);
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataGrid
                    data={books}
                    columns={columns}
                    filterComponent={<Filter onFilterChange={handleFilterChange}
                                             initialFilters={initialFilters}
                                             onSortChange={handleSortChange}
                                             sortOptions={sortOptions} />}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                    pageSize={LIMIT}
                    currentPage={page + 1}
                    totalPages={Math.ceil(totalRecords / LIMIT)}
                />
            )}
        </>
    );
};

export default BookCatalog;