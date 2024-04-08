import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {Dialog, TableCell} from "@mui/material";
import {AdminDeleteButton, AdminEditButton} from "../../styles/admin/Button";
import ConfirmationDialog from "../../dialog/ConfirmationDialog";
import {toast} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ReservationPreview = ({id, title, author, genre, language, pages, publicationYear, quantity, availableQuantity, books, setBooks}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const removeReservation = () => {
        const updatedList = books.filter((user) => user.id !== id);
        setBooks(updatedList);
        toast.success("Rezervace byla odstraněna");
        setOpenDeleteModal(false);
    }

    return (
        <>
            <TableCell component="th" scope="row"><NavLink to={`/books/${id}`}>{title}</NavLink></TableCell>
            <TableCell align="right">{author.firstName} {author.lastName}</TableCell>
            <TableCell align="right">{genre}</TableCell>
            <TableCell align="right">{language}</TableCell>
            <TableCell align="right">{pages}</TableCell>
            <TableCell align="right">{publicationYear}</TableCell>
            <TableCell align="right">{quantity}</TableCell>
            <TableCell align="right">{availableQuantity}</TableCell>
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
    title: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    genre: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    publicationYear: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    availableQuantity: PropTypes.number.isRequired,
    books: PropTypes.array.isRequired,
    setBooks: PropTypes.func.isRequired
};

export default ReservationPreview;