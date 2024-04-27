import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProfileDetail from "../../profile/ProfileDetail";
import {axiosPrivate} from "../../../api/axios";
import LoadingSpinner from "../../styles/material-ui/components/LoadingSpinner";
import ReservationPreview from "../../reservation/ReservationPreview";
import styled from "styled-components";

const UserDetail = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axiosPrivate.get(`/users/${id}`)
            .then(response => {
                setUser(response.data.payload);
                axiosPrivate(`/users/${id}/reservations`)
                    .then(response => {
                        setReservations(response.data.payload);
                    })
                    .catch(error => {
                        console.error('Error loading user reservations:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error loading user detail:', error);
            });
    }, [id]);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2>Údaje o uživateli</h2>
                    <ProfileDetail user={user}/>
                    {reservations.length > 0 && (
                        <>
                            <h2>Rezervace</h2>
                            <ReservationWrapperStyle>
                                {reservations.map(reservation => {
                                    return (
                                        <ReservationPreview
                                            key={reservation.id}
                                            reservationData={reservation}
                                        />
                                    );
                                })}
                            </ReservationWrapperStyle>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default UserDetail;

const ReservationWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
`
