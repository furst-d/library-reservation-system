import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Paginator from "./Paginator";

const DataGrid = ({ data, columns, filterComponent, onFilter, onPageChange, currentPage, totalPages }) => {
    return (
        <DataGridStyle>
            {filterComponent && React.cloneElement(filterComponent, { onFilter })}

            <HeaderRowStyle>
                {columns.map((column, index) => (
                    <HeaderCellStyle key={index}>
                        {column.header}
                    </HeaderCellStyle>
                ))}
            </HeaderRowStyle>
            {data.map((row, rowIndex) => (
                <DataRowStyle key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                        <DataCellStyle key={columnIndex}>
                            {row[column.accessor]}
                        </DataCellStyle>
                    ))}
                </DataRowStyle>
            ))}

            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </DataGridStyle>
    );
};

DataGrid.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    filterComponent: PropTypes.element,
    onFilter: PropTypes.func,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default DataGrid;

const DataGridStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRowStyle = styled.div`
  display: flex;
`;

const DataRowStyle = styled.div`
  display: flex;
`;

const HeaderCellStyle = styled.div`
  flex: 1;
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const DataCellStyle = styled.div`
  flex: 1;
  padding: 10px;
  text-align: left;
`;