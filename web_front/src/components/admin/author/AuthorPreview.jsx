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


const AuthorPreview = ({id, firstName, lastName, birthDate, nationality, authors, setAuthors}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const removeAuthor = () => {
        const updatedList = authors.filter((author) => author.id !== id);
        setAuthors(updatedList);
        toast.success("Autor byl odstraněn");
        setOpenDeleteModal(false);
    }

    return (
        <>
            <TableCell component="th" scope="row"><NavLink to={`/authors/${id}`}>{lastName}, {firstName}</NavLink></TableCell>
            <TableCell align="right">{formatDate(birthDate)}</TableCell>
            <TableCell align="right">{nationality}</TableCell>
            <TableCell align="right"><AdminEditButton onClick={() => setOpenEditModal(true)}><EditNoteIcon /></AdminEditButton></TableCell>
            <TableCell align="right"><AdminDeleteButton onClick={() => setOpenDeleteModal(true)}><DeleteIcon /></AdminDeleteButton></TableCell>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odebrat autora ${firstName} ${lastName}?`} onAccept={removeAuthor} onClose={() => setOpenDeleteModal(false)} />
            </Dialog>
        </>
    );
};

AuthorPreview.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    setAuthors: PropTypes.func.isRequired
};

export default AuthorPreview;