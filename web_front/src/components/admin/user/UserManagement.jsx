import React, {useEffect, useState} from 'react';
import useFilter from "../../../hooks/useFilter";
import {axiosPrivate} from "../../../api/axios";
import DataGrid from "../../data-grid/DataGrid";
import LoadingSpinner from "../../styles/material-ui/components/LoadingSpinner";
import Filter from "../../data-grid/Filter";
import UserPreview from "./UserPreview";
import AddIcon from '@mui/icons-material/Add';
import {AdminAddButton} from "../../styles/admin/Button";
import PropTypes from "prop-types";
import {isAdmin} from "../../../utils/auth/authManager";
import {formatDate} from "../../../utils/date/dateFormatter";

const UserManagement = ({loggedUser}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [openAddModal, setOpenAddModal] = useState(false);
    const LIMIT = 10;

    const initialFiltersAndSorters = [
        { name: 'email', type: 'text', value: '', placeholder: 'Email' },
        { name: 'lastName', type: 'text', value: '', placeholder: 'Příjmení' },
    ];

    const [apiFilters, updateFilters] = useFilter(initialFiltersAndSorters);

    useEffect(() => {
        axiosPrivate.get(`/users`, {
            params: {
                page: page,
                size: LIMIT,
                filters: encodeURIComponent(JSON.stringify(apiFilters))
            }
        }).then(response => {
            setUsers(response.data.payload.data);
            setTotalRecords(response.data.payload.totalCount);
        }).catch(error => {
            console.error('Error loading users:', error);
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
                    {isAdmin(loggedUser) && (
                        <AdminAddButton onClick={() => setOpenAddModal(true)}><AddIcon />Nový uživatel</AdminAddButton>
                    )}
                    <DataGrid
                        data={users}
                        filterComponent={<Filter onFilterChange={handleFilterChange}
                                                 initialFilters={initialFiltersAndSorters} />}
                        onPageChange={(newPage) => setPage(newPage - 1)}
                        pageSize={LIMIT}
                        currentPage={page + 1}
                        totalPages={Math.ceil(totalRecords / LIMIT)}
                        headers={['Email', 'Jméno', 'Role', 'Datum narození']}
                        renderRow={(row) => (
                            <UserPreview
                                id={row.id}
                                email={row.email}
                                firstName={row.firstName}
                                lastName={row.lastName}
                                birthDate={formatDate(row.birthDate)}
                                roles={row.authorities}
                                users={users}
                                setUsers={setUsers}
                                loggedUser={loggedUser}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
};

UserManagement.propTypes = {
    loggedUser: PropTypes.object,
};

export default UserManagement;
