import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    TextField,
    Checkbox,
    Button,
    FormControlLabel,
    styled as styledMUI,
    InputLabel,
    Select,
    FormControl
} from '@mui/material';
import MenuItem from "../styles/material-ui/components/menu/MenuItem";

const Filter = ({ onFilterChange, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (event, index) => {
        const {value } = event.target;
        setFilters(prevFilters =>
            prevFilters.map((filter, i) =>
                i === index ? { ...filter, value: value } : filter
            )
        );
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

        const filterParams = filters.filter(filter => filter.name !== 'sortBy' && filter.name !== 'sortDir');
        const sortParams = filters.find(filter => filter.name === 'sortBy');
        const directionParams = filters.find(filter => filter.name === 'sortDir');
        const direction = directionParams ? directionParams.value : 'asc';

        const sortValue = sortParams ? `${sortParams.value},${direction}` : '';

        onFilterChange(
            filterParams.map(filter => ({
                name: filter.name,
                value: filter.value
            })),
            sortValue
        );
    };


    const handleReset = () => {
        setFilters(initialFilters);
        onFilterChange(initialFilters);
    };

    const handleSelectChange = (event, index) => {
        const { value } = event.target;
        setFilters(prevFilters =>
            prevFilters.map((filter, i) =>
                i === index ? { ...filter, value: value } : filter
            )
        );
    };

    const filtersArray = Object.keys(filters).map(key => ({
        ...filters[key],
        name: key
    }));

    return (
        <FilterContainerStyle>
            <h3>Filtr</h3>
            <form onSubmit={handleSubmit}>
                {filtersArray.map((filter, index) => {
                    switch (filter.type) {
                        case 'text':
                            return (<StyledTextField
                                key={index}
                                name={filter.name}
                                value={filter.value}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder={filter.placeholder}
                                variant="outlined"
                                size="small"
                                margin="normal"
                                fullWidth
                            />);
                        case 'select':
                            return (
                                <StyledFormControl fullWidth key={index} variant="outlined" size="small" margin="normal">
                                    <InputLabel id={`${filter.name}-label`}>{filter.placeholder}</InputLabel>
                                    <Select
                                        labelId={`${filter.name}-label`}
                                        id={`${filter.name}-select`}
                                        name={filter.name}
                                        value={filter.value}
                                        onChange={(e) => handleSelectChange(e, index)}
                                        label={filter.placeholder}
                                        fullWidth
                                    >
                                        {filter.nullable && (
                                            <MenuItem value="">
                                                <em>Zrušit výběr</em>
                                            </MenuItem>
                                        )}
                                        {filter.options.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </StyledFormControl>
                            );
                        case 'checkbox':
                            return (<StyledFormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        name={filter.name}
                                        checked={filter.value}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                }
                                label={filter.placeholder}
                            />);
                        default:
                            return null;
                    }
                })}

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
};

Filter.defaultProps = {
    initialFilters: {},
};

export default Filter;

const FilterContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px 10px;
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
        padding-bottom: 0px;
    }
`;

const StyledFormControl = styledMUI(FormControl)`
    margin-top: 5px;
    
    & .MuiInputLabel-root {
        font-size: 0.875rem;
        top: -4px;
    }
    
    & .MuiInputBase-root {
        max-width: 20em;
    }
    
    & .MuiOutlinedInput-input {
        padding-top: 3px;
        padding-bottom: 3px;
    }
`

const ButtonGroupStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 5px;
`;
