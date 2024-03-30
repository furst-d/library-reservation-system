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

const Filter = ({ onFilterChange, initialFilters, onSortChange, sortOptions }) => {
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
        console.log(event.target.name, event.target.value)
        onSortChange(event.target.name, event.target.value);
    };

    const handleSelectChange = (event, index) => {
        const { name, value } = event.target;
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

                                        <MenuItem value="">
                                            <em>Žádný</em>
                                        </MenuItem>
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

                {sortOptions.map((option) => (
                    <StyledFormControl fullWidth variant="outlined" size="small" margin="normal" key={option.name}>
                        <InputLabel id={`${option.name}-label`}>{option.label}</InputLabel>
                        <Select
                            labelId={`${option.name}-label`}
                            id={`${option.name}-select`}
                            name={option.name}
                            value={filters[option.name] || ''}
                            onChange={handleSortOptionChange}
                            label={option.label}
                        >
                            {option.values.map((value) => (
                                <MenuItem key={value.value} value={value.value}>
                                    {value.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </StyledFormControl>
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
