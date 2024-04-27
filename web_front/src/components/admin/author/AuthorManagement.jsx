import React, {useEffect, useState} from 'react';
import useFilter from "../../../hooks/useFilter";
import axios from "../../../api/axios";
import LoadingSpinner from "../../styles/material-ui/components/LoadingSpinner";
import {AdminAddButton} from "../../styles/admin/Button";
import AddIcon from "@mui/icons-material/Add";
import DataGrid from "../../data-grid/DataGrid";
import Filter from "../../data-grid/Filter";
import AuthorPreview from "./AuthorPreview";
import {Dialog} from "@mui/material";
import AuthorDialog from "./AuthorDialog";

const AuthorManagement = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [nationalities, setNationalities] = useState([]);
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

    useEffect(() => {
        axios.get('/authors/nationalities')
            .then(response => {
                setNationalities(response.data.payload.map(g => ({ value: g.id, label: g.label })));
            })
            .catch(error => {
                console.error('Error loading nationalities:', error);
            });
    }, []);

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
                    <AdminAddButton onClick={() => setOpenAddModal(true)}><AddIcon />Nový autor</AdminAddButton>
                    <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
                        <AuthorDialog setOpenModel={setOpenAddModal} nationalities={nationalities} />
                    </Dialog>
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
                                nationality={row.nationality.label}
                                authors={authors}
                                setAuthors={setAuthors}
                                nationalities={nationalities}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
};

export default AuthorManagement;
