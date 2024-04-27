import React, {useEffect, useState} from 'react';
import useFilter from "../../../hooks/useFilter";
import {axiosPrivate} from "../../../api/axios";
import LoadingSpinner from "../../styles/material-ui/components/LoadingSpinner";
import DataGrid from "../../data-grid/DataGrid";
import Filter from "../../data-grid/Filter";
import ReservationPreview from "./ReservationPreview";

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const LIMIT = 10;

    const initialFiltersAndSorters = [
        { name: 'email', type: 'text', value: '', placeholder: 'Email' },
        { name: 'lastName', type: 'text', value: '', placeholder: 'Příjmení' },
        { name: 'expired', type: 'checkbox', value: false, placeholder: 'Prošlé' },
    ];

    const [apiFilters, updateFilters] = useFilter(initialFiltersAndSorters);

    useEffect(() => {
        axiosPrivate.get(`/reservations`, {
            params: {
                page: page,
                size: LIMIT,
                sort: 'reservationDate,desc',
                filters: encodeURIComponent(JSON.stringify(apiFilters))
            }
        }).then(response => {
            setReservations(response.data.payload.data);
            setTotalRecords(response.data.payload.totalCount);
        }).catch(error => {
            console.error('Error loading reservations:', error);
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
                <DataGrid
                    data={reservations}
                    filterComponent={<Filter onFilterChange={handleFilterChange}
                                             initialFilters={initialFiltersAndSorters} />}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                    pageSize={LIMIT}
                    currentPage={page + 1}
                    totalPages={Math.ceil(totalRecords / LIMIT)}
                    headers={['Email', 'Jméno', 'Počet knih', 'Vráceno', 'Datum rezervace', 'Zarezervováno do', 'Pokuta']}
                    renderRow={(row) => (
                        <ReservationPreview
                            id={row.id}
                            userId={row.appUser.id}
                            email={row.appUser.email}
                            firstName={row.appUser.firstName}
                            lastName={row.appUser.lastName}
                            returnedAt={row.returnedAt}
                            reservationDate={row.reservationDate}
                            returnDate={row.returnDate}
                            penalty={row.penalty ? row.penalty.amountCzk : 0}
                            bookCount={row.books.length}
                            reservations={reservations}
                            setReservations={setReservations}
                        />
                    )}
                />
            )}
        </>
    );
};

export default ReservationManagement;
