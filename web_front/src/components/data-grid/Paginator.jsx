import styled from "styled-components";
import {Button} from "@mui/material";
import PropTypes from "prop-types";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const pageBuffer = 2; // Počet stránek před a za aktuální stránkou
    const outerPages = 3; // Počet stránek na začátku a na konci

    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Přidáváme vždy první 'outerPages' stránky
        for (let i = 1; i <= outerPages; i++) {
            pageNumbers.push(i);
        }

        // Přidáváme ellipsis, pokud je mezera mezi prvními a středními stránkami
        if (currentPage > outerPages + pageBuffer + 1) {
            pageNumbers.push('...');
        }

        // Přidáváme stránky kolem aktuální stránky, pokud nepatří do prvních nebo posledních stránek
        let startMiddlePages = Math.max(currentPage - pageBuffer, outerPages + 1);
        let endMiddlePages = Math.min(currentPage + pageBuffer, totalPages - outerPages);
        for (let i = startMiddlePages; i <= endMiddlePages; i++) {
            if (!pageNumbers.includes(i)) {
                pageNumbers.push(i);
            }
        }

        // Přidáváme ellipsis, pokud je mezera mezi středními a posledními stránkami
        if (currentPage < totalPages - outerPages - pageBuffer) {
            pageNumbers.push('...');
        }

        // Přidáváme vždy poslední 'outerPages' stránky
        for (let i = totalPages - outerPages + 1; i <= totalPages; i++) {
            if (!pageNumbers.includes(i)) {
                pageNumbers.push(i);
            }
        }
    }

    return (
        <PaginatorWrapper>
            {pageNumbers.map((number, index) => (
                typeof number === 'number' ? (
                    <Button
                        key={number}
                        variant="contained"
                        onClick={() => onPageChange(number)}
                        disabled={number === currentPage}
                    >
                        {number}
                    </Button>
                ) : (
                    <PaginatorSeparator key={number}>{number}</PaginatorSeparator>
                )
            ))}
        </PaginatorWrapper>
    );
};


Paginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paginator;

const PaginatorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    gap: 5px;
`;

const PaginatorSeparator = styled.div`
    margin: auto 10px;
    user-select: none;
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`;