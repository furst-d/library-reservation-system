import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ReservationPreview = ({ reservationData }) => {
    const { id, books, reservationDate, returnDate, returnedAt, penalty } = reservationData;

    return (
        <ReservationContainer expired={new Date(returnDate) < new Date()} returned={returnedAt !== null} penalty={penalty}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ReservationInfo>
                        <ReservationDetail>Rezervace číslo: {id}</ReservationDetail>
                        <ReservationDetail>Datum rezervace: {new Date(reservationDate).toLocaleDateString()}</ReservationDetail>
                        <ReservationDetail>Nejpozdější datum vrácení: {new Date(returnDate).toLocaleDateString()}</ReservationDetail>
                        {returnedAt && <ReservationDetail>Datum vrácení: {new Date(returnedAt).toLocaleDateString()}</ReservationDetail>}
                        {penalty && (
                            <PenaltyInfo paid={penalty.paid}>
                                {penalty.paid
                                    ? `Pokuta zaplacena dne ${new Date(penalty.paymentDate).toLocaleDateString()}`
                                    : `Nezaplacená pokuta vytvořena dne ${new Date(penalty.creationDate).toLocaleDateString()}`}
                            </PenaltyInfo>
                        )}
                    </ReservationInfo>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BookList>
                        {books.map(book => (
                            <BookItem key={book.id}>
                                <BookCover src={book.coverImageLink} alt={book.title} />
                                <BookTitle>{book.title}</BookTitle>
                            </BookItem>
                        ))}
                    </BookList>
                </Grid>
            </Grid>
        </ReservationContainer>
    );
};

ReservationPreview.propTypes = {
    reservationData: PropTypes.object.isRequired,
};

export default ReservationPreview;

const ReservationContainer = styled(Paper)`
  padding: 16px;
  background-color: ${props => {
    if ((props.expired && !props.returned) || (props.penalty && !props.penalty.paid)) return '#f8d7da !important'; //red
    if (props.returned) return '#d4edda !important'; //green
    return '#fff3cd !important'; //yellow
}};
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const BookCover = styled.img`
  width: 50px;
  height: 75px;
  margin-right: 16px;
`;

const BookTitle = styled.span`
  margin-right: auto;
`;

const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReservationDetail = styled.div`
  margin-bottom: 4px;
`;

const PenaltyInfo = styled.div`
  color: ${props => (props.paid ? 'green' : 'red')};
`;
