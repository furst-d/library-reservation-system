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
import {axiosPrivate} from "../../../api/axios";
import AuthorDialog from "./AuthorDialog";


const AuthorPreview = ({id, firstName, lastName, birthDate, nationality, authors, setAuthors, nationalities}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const removeAuthor = () => {
        axiosPrivate.delete(`/authors/${id}`)
            .then(() => {
                const updatedList = authors.filter((author) => author.id !== id);
                setAuthors(updatedList);
                toast.success("Autor byl odstraněn");
                setOpenDeleteModal(false);
            })
            .catch(() => {
                toast.error("Při odstraňování autora došlo k chybě");
            });
    };

    return (
        <>
            <TableCell component="th" scope="row"><NavLink to={`/authors/${id}`}>{lastName}, {firstName}</NavLink></TableCell>
            <TableCell align="right">{formatDate(birthDate)}</TableCell>
            <TableCell align="right">{nationality}</TableCell>
            <TableCell align="right"><AdminEditButton onClick={() => setOpenEditModal(true)}><EditNoteIcon /></AdminEditButton></TableCell>
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <AuthorDialog setOpenModel={setOpenEditModal} authorId={id} nationalities={nationalities} />
            </Dialog>
            <TableCell align="right"><AdminDeleteButton onClick={() => setOpenDeleteModal(true)}><DeleteIcon /></AdminDeleteButton></TableCell>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odebrat autora ${firstName} ${lastName}? Odstranění bude mít za následek rovněž odstranění všech jeho knih.`} onAccept={removeAuthor} onClose={() => setOpenDeleteModal(false)} />
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
    setAuthors: PropTypes.func.isRequired,
    nationalities: PropTypes.array.isRequired,
};

export default AuthorPreview;