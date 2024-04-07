import React, {useEffect, useState} from 'react';
import {axiosPrivate} from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import DataGrid from "../data-grid/DataGrid";
import ReservationPreview from "../reservation/ReservationPreview";

const ProfileReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        axiosPrivate.get(`/profile/reservations`, {
            params: {
                page: page,
                size: LIMIT,
                sort: 'reservationDate,desc'
            }
        }).then(response => {
            setReservations(response.data.payload.data);
            setTotalRecords(response.data.payload.totalCount);
        }).catch(error => {
            console.error('Error loading reservations:', error);
        }).finally(() => {
            setLoading(false);
        });

    }, [page]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataGrid
                    data={reservations}
                    onPageChange={(newPage) => setPage(newPage - 1)}
                    pageSize={LIMIT}
                    currentPage={page + 1}
                    totalPages={Math.ceil(totalRecords / LIMIT)}
                    renderType="flex"
                    flexDirection="column"
                    renderRow={(row) => (
                        <ReservationPreview
                            reservationData={row}
                        />
                    )}
                />
            )}
        </>
    );
};

export default ProfileReservations;
