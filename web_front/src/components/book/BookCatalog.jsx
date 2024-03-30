import React, {useEffect, useMemo, useState} from 'react';
import axios from "../../api/axios";
import DataGrid from "../data-grid/DataGrid";
import Filter from "../data-grid/Filter";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import useFilter from "../../hooks/useFilter";

const BookCatalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState('id,asc');
    const [totalRecords, setTotalRecords] = useState(0);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const LIMIT = 10;

    const columns = [
        { header: 'Název knihy', accessor: 'title' },
        { header: 'Příjmení autora', accessor: 'authorLastName' },
        { header: 'Rok vydání', accessor: 'publicationYear' },
    ];

    const initialFiltersAndSorters = useMemo(() => [
        { name: 'title', type: 'text', value: '', placeholder: 'Název knihy' },
        { name: 'author', type: 'text', value: '', placeholder: 'Jméno autora' },
        { name: 'genre', type: 'select', value: '', nullable: true, options: genres, placeholder: 'Vyberte žánr' },
        { name: 'language', type: 'select', value: '', nullable: true, options: languages, placeholder: 'Vyberte jazyk' },
        { name: 'inStock', type: 'checkbox', value: true, placeholder: 'Skladem' },
        { name: 'sortBy', type: 'select', value: 'id', nullable: false, placeholder: 'Řadit dle',  options:
                [
                    { value: 'id', label: 'Výchozí' },
                    { value: 'title', label: 'Název' },
                    { value: 'authorLastName', label: 'Příjmení autora' }
                ]
        },
        { name: 'sortDir', type: 'select', value: 'asc', placeholder: 'Směr řazení', options:
                [
                    { value: 'asc', label: 'A-Z' },
                    { value: 'desc', label: 'Z-A' }
                ]
        }
    ], [genres, languages])

    const [apiFilters, updateFilters] = useFilter(initialFiltersAndSorters.filter(f => f.name !== 'sortBy' && f.name !== 'sortDir'));

    useEffect(() => {
        axios.get(`/books`, {
            params: {
                page: page,
                size: LIMIT,
                sort: sort,
                filters: encodeURIComponent(JSON.stringify(apiFilters))
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

    }, [apiFilters, books, page, sort]);

    useEffect(() => {
        axios.get('/books/genres')
            .then(response => {
                setGenres(response.data.payload.map(g => ({ value: g.id, label: g.label })));
            })
            .catch(error => {
                console.error('Error loading genres:', error);
            });

        axios.get('/books/languages')
            .then(response => {
                setLanguages(response.data.payload.map(l => ({ value: l.id, label: l.label })));
            })
            .catch(error => {
                console.error('Error loading languages:', error);
            });
    }, []);


    const handleFilterChange = (filters, sort) => {
        setSort(sort);
        updateFilters(filters);
        setPage(0);
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
                                             initialFilters={initialFiltersAndSorters} />}
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