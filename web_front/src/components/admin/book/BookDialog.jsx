import React, {useEffect, useState} from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import LoginIcon from "@mui/icons-material/Login";
import axios, {axiosPrivate} from "../../../api/axios";
import PropTypes from "prop-types";

const BookDialog = ({bookId, languages, genres, authors, setOpenModel}) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [pages, setPages] = useState(100);
    const [pagesError, setPagesError] = useState(false);
    const [publicationYear, setPublicationYear] = useState(2000);
    const [publicationYearError, setPublicationYearError] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [availableQuantity, setAvailableQuantity] = useState(1);
    const [availableQuantityError, setAvailableQuantityError] = useState(false);
    const [coverImageLink, setCoverImageLink] = useState("");
    const [coverImageLinkError, setCoverImageLinkError] = useState(false);
    const [language, setLanguage] = useState(2);
    const [genre, setGenre] = useState(1);
    const [authorId, setAuthorId] = useState(1);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);
    const isEdit = bookId !== undefined;

    useEffect(() => {
        if(isEdit) {
            axios.get(`/books/${bookId}`)
                .then(res => {
                    const data = res.data.payload;
                    setTitle(data.title);
                    setPages(data.pages);
                    setPublicationYear(data.publicationYear);
                    setQuantity(data.quantity);
                    setAvailableQuantity(data.availableQuantity);
                    setCoverImageLink(data.coverImageLink);
                    setLanguage(data.language.id);
                    setGenre(data.genre.id);
                    setAuthorId(data.author.id);
                })
                .catch(() => {
                    setOpenModel(false);
                });
        }
    }, [isEdit, bookId, setOpenModel]);

    const handleError = () => {
        switch (status) {
            case 401:
                return (<ErrorItemStyle>Chybné uživatelské jméno nebo email.</ErrorItemStyle>)
            case 403:
                return (<ErrorItemStyle>Účet s tímto emailem již existuje.</ErrorItemStyle>)
            default:
                return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
        }
    }

    const validate = () => {
        let error = false;
        setTitleError(false);
        setPagesError(false);
        setPublicationYearError(false);
        setQuantityError(false);
        setAvailableQuantityError(false);
        setCoverImageLinkError(false);

        setErrors([]);

        if(!title) {
            error = true;
            setErrors(old => [...old, "Titulek musí být vyplněn."]);
            setTitleError(true);
        }

        if(pages <= 0) {
            error = true;
            setErrors(old => [...old, "Počet stran musí být kladný."]);
            setPagesError(true);
        }

        if(publicationYear <= 0) {
            error = true;
            setErrors(old => [...old, "Rok vydání musí být kladný."]);
            setPublicationYearError(true);
        }

        if(quantity <= 0) {
            error = true;
            setErrors(old => [...old, "Počet kusů musí být kladný."]);
            setQuantityError(true);
        }

        if(availableQuantity <= 0 || availableQuantity > quantity) {
            error = true;
            setErrors(old => [...old, "Počet dostupných kusů musí být kladný a stejný nebo menší než celkový počet kusů."]);
            setAvailableQuantityError(true);
        }

        if (!coverImageLink) {
            error = true;
            setErrors(old => [...old, "Odkaz na náhledový obrázek musí být vyplněn."]);
            setCoverImageLinkError(true);
        }

        if(!error) {
            setLoading(true);
            if(isEdit) {
                handleUpdate();
            } else {
                handleAdd();
            }
        }
    }

    const handleAdd = () => {
        axiosPrivate.post(`/books`, {
            title: title,
            authorId: authorId,
            genreId: genre,
            languageId: language,
            pages: pages,
            publicationYear: publicationYear,
            quantity: quantity,
            availableQuantity: availableQuantity,
            coverImageLink: coverImageLink
        })
            .then(res => {
                localStorage.setItem("toast", "Registrace byla úspěšná");
                window.location.reload();
            })

            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    const handleUpdate = () => {
        axiosPrivate.put(`/books/${bookId}`, {
            title: title,
            authorId: authorId,
            genreId: genre,
            languageId: language,
            pages: pages,
            publicationYear: publicationYear,
            quantity: quantity,
            availableQuantity: availableQuantity,
            coverImageLink: coverImageLink
        })
            .then(res => {
                localStorage.setItem("toast", "Kniha byla upravena");
                window.location.reload();
            })

            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    const handleGenreSelectBoxChange = (e) => {
        setGenre(e.target.value);
    };

    const handleLanguageSelectBoxChange = (e) => {
        setLanguage(e.target.value);
    }

    const handleAuthorSelectBoxChange = (e) => {
        setAuthorId(e.target.value);
    }

    return (
        <>
            <DialogTitle>{isEdit ? "Upravit knihu" : "Vložit knihu"}</DialogTitle>
            <DialogContent>
                <TextField value={title} onChange={e => setTitle(e.target.value)} error={titleError} required label="Titulek" fullWidth margin="dense" />
                <FormControl fullWidth key={"authors"} variant="outlined" margin="normal">
                    <InputLabel id={"authors-label"}>{"Autor"}</InputLabel>
                    <Select labelId={"authors-label"} value={authorId} onChange={handleAuthorSelectBoxChange} label="Jazyk" fullWidth margin="dense">
                        {authors.map(author => (
                            <MenuItem key={author.id} value={author.id}>{author.lastName}, {author.firstName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth key={"genres"} variant="outlined" margin="normal">
                    <InputLabel id={"genres-label"}>{"Žánr"}</InputLabel>
                    <Select labelId={"genres-label"} value={genre} onChange={handleGenreSelectBoxChange} label="Jazyk" fullWidth margin="dense">
                        {genres.map(genre => (
                            <MenuItem key={genre.value} value={genre.value}>{genre.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth key={"languages"} variant="outlined" margin="normal">
                    <InputLabel id={"languages-label"}>{"Jazyk"}</InputLabel>
                    <Select labelId={"languages-label"} value={language} onChange={handleLanguageSelectBoxChange} label="Jazyk" fullWidth margin="dense">
                        {languages.map(language => (
                            <MenuItem key={language.value} value={language.value}>{language.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField value={pages} onChange={e => setPages(e.target.value)} error={pagesError} required label="Počet stran" fullWidth margin="dense" type="number" />
                <TextField value={publicationYear} onChange={e => setPublicationYear(e.target.value)} error={publicationYearError} required label="Rok vydání" fullWidth margin="dense" type="number" />
                <TextField value={quantity} onChange={e => setQuantity(e.target.value)} error={quantityError} required label="Počet kusů" fullWidth margin="dense" type="number" />
                <TextField value={availableQuantity} onChange={e => setAvailableQuantity(e.target.value)} error={availableQuantityError} required label="Počet dostupných kusů" fullWidth margin="dense" type="number" />
                <TextField value={coverImageLink} onChange={e => setCoverImageLink(e.target.value)} error={coverImageLinkError} required label="Odkaz na náhledový obrázek" fullWidth margin="dense" />

                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <DialogActions>
                    <Button type="submit" variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validate}>{isEdit ? "Upravit knihu" : "Vložit knihu"}</Button>
                    <Button onClick={() => setOpenModel(false)} variant="outlined">Zavřít</Button>
                </DialogActions>
            </DialogContent>
        </>
    );
};

BookDialog.propTypes = {
    bookId: PropTypes.number,
    languages: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    setOpenModel: PropTypes.func.isRequired,
};

export default BookDialog;
