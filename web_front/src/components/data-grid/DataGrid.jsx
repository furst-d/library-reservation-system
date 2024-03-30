import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Paginator from "./Paginator";

const DataGrid = ({ data, filterComponent, onFilter, onPageChange, currentPage, totalPages, renderType = 'table', renderRow }) => {

    const renderContent = () => {
        if (renderType === 'flex' && renderRow) {
            return data.map((item, index) => <div key={index}>{renderRow(item)}</div>);
        }
    };

    return (
        <DataGridStyle>
            {filterComponent && React.cloneElement(filterComponent, { onFilter })}

            <ContentContainer renderType={renderType}>
                {renderContent()};
            </ContentContainer>

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

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;


const DataGridStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`;