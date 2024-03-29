import {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

const convertFiltersToApiFormat = (filters) => {
    return filters.map(filter => ({
        name: filter.name,
        value: filter.value
    }))
};

const UseFilter = (initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);

    // Převod na formát API při změně filtrů
    const apiFilters = convertFiltersToApiFormat(filters);


    const updateFilters = useCallback((updatedFilters) => {
        setFilters(updatedFilters);
    }, []);

    return [apiFilters, updateFilters];
};

UseFilter.propTypes = {
    initialFilters: PropTypes.array.isRequired,
};

export default UseFilter;