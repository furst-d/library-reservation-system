import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Paginator from "./Paginator";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const DataGrid = ({ data, filterComponent, onFilter, onPageChange, currentPage, totalPages, renderType = 'table', flexDirection = 'row', renderRow, headers }) => {
    const renderContent = () => {
        switch (renderType) {
            case 'flex':
                return (
                    <FlexContainer direction={flexDirection}>
                        {data.map((item, index) => <FlexItem key={index}>{renderRow(item)}</FlexItem>)}
                    </FlexContainer>
                );
            case 'table':
                return (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            {headers &&
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header, index) => (
                                            <TableCell
                                                {...(index === 0 ? { component: 'th', scope: 'row', sx: { fontWeight: 'bold' } } : { align: 'right', sx: { fontWeight: 'bold' }})}
                                                key={index}
                                            >
                                                {header}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                </TableHead>
                            }
                            <TableBody>
                                {data.map((item, index) => <TableRow key={index}>{renderRow(item)}</TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            default:
                return null;
        }
    };

    return (
        <DataGridStyle>
            {filterComponent && React.cloneElement(filterComponent, { onFilter })}

            {renderContent()}

            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </DataGridStyle>
    );
};

DataGrid.propTypes = {
    data: PropTypes.array.isRequired,
    filterComponent: PropTypes.element,
    onFilter: PropTypes.func,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    renderType: PropTypes.oneOf(['table', 'flex']),
    renderRow: PropTypes.func,
};

export default DataGrid;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    flex-wrap: wrap;
`;

const FlexItem = styled.div`
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
`;

const DataGridStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`;


