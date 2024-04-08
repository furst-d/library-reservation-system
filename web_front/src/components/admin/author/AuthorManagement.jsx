import React, {useEffect, useState} from 'react';
import useFilter from "../../../hooks/useFilter";
import axios from "../../../api/axios";
import LoadingSpinner from "../../styles/material-ui/components/LoadingSpinner";
import {AdminAddButton} from "../../styles/admin/Button";
import AddIcon from "@mui/icons-material/Add";
import DataGrid from "../../data-grid/DataGrid";
import Filter from "../../data-grid/Filter";
import ReservationPreview from "../reservation/ReservationPreview";
import AuthorPreview from "./AuthorPreview";

const AuthorManagement = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [openAddModal, setOpenAddModal] = useState(false);
    const LIMIT = 10;

    const initialFiltersAndSorters = [
        { name: 'lastName', type: 'text', value: '', placeholder: 'Příjmení' }
    ];

    const [apiFilters, updateFilters] = useFilter(initialFiltersAndSorters);

    useEffect(() => {
        axios.get(`/authors`, {
            params: {
                page: page,
                size: LIMIT,
                filters: encodeURIComponent(JSON.stringify(apiFilters))
            }
        }).then(response => {
            setAuthors(response.data.payload.data);
            setTotalRecords(response.data.payload.totalCount);
        }).catch(error => {
            console.error('Error loading authors:', error);
        }).finally(() => {
            setLoading(false);
        });

    }, [apiFilters, page]);

    const handleFilterChange = (filters) => {
        updateFilters(filters);
        setPage(0);
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <AdminAddButton onClick={() => setOpenAddModal(true)}><AddIcon />Nová rezervace</AdminAddButton>
                    <DataGrid
                        data={authors}
                        filterComponent={<Filter onFilterChange={handleFilterChange}
                                                 initialFilters={initialFiltersAndSorters} />}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                        pageSize={LIMIT}
                        currentPage={page + 1}
                        totalPages={Math.ceil(totalRecords / LIMIT)}
                        headers={['Jméno', 'Datum narození', 'Národnost']}
                        renderRow={(row) => (
                            <AuthorPreview
                                id={row.id}
                                firstName={row.firstName}
                                lastName={row.lastName}
                                birthDate={row.birthDate}
                                nationality={row.nationality}
                                authors={authors}
                                setAuthors={setAuthors}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
};

export default AuthorManagement;
