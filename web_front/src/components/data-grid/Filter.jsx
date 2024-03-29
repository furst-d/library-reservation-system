import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {TextField, Checkbox, Button, FormControlLabel, styled as styledMUI} from '@mui/material';

const Filter = ({ onFilterChange, initialFilters, onSortChange, sortOptions }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (event, index) => {
        const {value } = event.target;
        setFilters(prevFilters =>
            prevFilters.map((filter, i) =>
                i === index ? { ...filter, value: value } : filter
            )
        );
        console.log(filters);
    };

    const handleCheckboxChange = (event, index) => {
        const {checked } = event.target;
        setFilters(prevFilters =>
            prevFilters.map((filter, i) =>
                i === index ? { ...filter, value: checked } : filter
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilterChange(filters.map(filter => ({
            name: filter.name,
            value: filter.value
        })));
    };

    const handleReset = () => {
        setFilters(initialFilters);
        onFilterChange(initialFilters);
    };

    const handleSortOptionChange = (event) => {
        onSortChange(event.target.name, event.target.value);
    };

    const filtersArray = Object.keys(filters).map(key => ({
        ...filters[key],
        name: key
    }));

    return (
        <FilterContainerStyle>
            <h3>Filtr</h3>
            <form onSubmit={handleSubmit}>
                {filtersArray.map((filter, index) =>
                    filter.type === 'text' ? (
                        <StyledTextField
                            key={index}
                            name={filter.name}
                            value={filter.value}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder={filter.placeholder}
                            variant="outlined"
                            size="small"
                            margin="normal"
                            fullWidth
                        />
                    ) : filter.type === 'checkbox' ? (
                        <StyledFormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    name={filter.name}
                                    checked={filter.value}
                                    onChange={(e) => handleCheckboxChange(e, index)}
                                />
                            }
                            label={filter.placeholder}
                        />
                    ) : null
                )}
                {sortOptions.map((option) => (
                    <div key={option.name}>
                        <label htmlFor={option.name}>{option.label}</label>
                        <select name={option.name} onChange={handleSortOptionChange}>
                            {option.values.map((value) => (
                                <option key={value.value} value={value.value}>
                                    {value.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <ButtonGroupStyle>
                    <Button type="submit" variant="contained" color="primary">
                        Filtrovat
                    </Button>
                    <Button type="button" onClick={handleReset} variant="outlined">
                        Resetovat
                    </Button>
                </ButtonGroupStyle>
            </form>
        </FilterContainerStyle>
    );
};

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    initialFilters: PropTypes.array,
    onSortChange: PropTypes.func.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })).isRequired,
    })).isRequired,
};

Filter.defaultProps = {
    initialFilters: {},
};

export default Filter;

const FilterContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const StyledTextField = styledMUI(TextField)`
    margin-top: 5px;
 
    & .MuiInputBase-root {
        max-width: 20em;
        height: 30px;
    }

    & .MuiOutlinedInput-input {
        padding: 8px;
    }
`;

const StyledFormControlLabel = styledMUI(FormControlLabel)`
    margin-bottom: 5px;
    
    & .MuiTypography-root {
        font-size: 0.875rem;
    }

    & .MuiCheckbox-root {
        padding-top: 0px;
    }
`;

const ButtonGroupStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;
