import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {Dialog, TableCell} from "@mui/material";
import {AdminDeleteButton, AdminEditButton} from "../../styles/admin/Button";
import ConfirmationDialog from "../../dialog/ConfirmationDialog";
import {toast} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {formatDate} from "../../../utils/date/dateFormatter";


const ReservationPreview = ({id, email, firstName, lastName, returnedAt, reservationDate, returnDate, penalty, bookCount, reservations, setReservations}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const removeReservation = () => {
        const updatedList = reservations.filter((user) => user.id !== id);
        setReservations(updatedList);
        toast.success("Rezervace byla odstraněna");
        setOpenDeleteModal(false);
    }

    return (
        <>
            <TableCell component="th" scope="row"><NavLink to={`/admin/users/${id}`}>{email}</NavLink></TableCell>
            <TableCell align="right">{lastName}, {firstName}</TableCell>
            <TableCell align="right">{bookCount}</TableCell>
            <TableCell align="right">{returnedAt ? formatDate(returnedAt) : 'Nevráceno'}</TableCell>
            <TableCell align="right">{formatDate(reservationDate)}</TableCell>
            <TableCell align="right">{formatDate(returnDate)}</TableCell>
            <TableCell align="right">{penalty} Kč</TableCell>
            <TableCell align="right"><AdminEditButton onClick={() => setOpenEditModal(true)}><EditNoteIcon /></AdminEditButton></TableCell>
            <TableCell align="right"><AdminDeleteButton onClick={() => setOpenDeleteModal(true)}><DeleteIcon /></AdminDeleteButton></TableCell>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odebrat rezervaci?`} onAccept={removeReservation} onClose={() => setOpenDeleteModal(false)} />
            </Dialog>
        </>
    );
};

ReservationPreview.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bookCount: PropTypes.number.isRequired,
    reservationDate: PropTypes.string.isRequired,
    returnDate: PropTypes.string.isRequired,
    returnedAt: PropTypes.string,
    penalty: PropTypes.number.isRequired,
    reservations: PropTypes.array.isRequired,
    setReservations: PropTypes.func.isRequired,
};

export default ReservationPreview;