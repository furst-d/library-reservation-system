import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

const convertFiltersToApiFormat = (filters) => {
    return filters.map(filter => ({
        name: filter.name,
        value: filter.value
    }))
};

const UseFilter = (initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);

    const apiFilters = useMemo(() => convertFiltersToApiFormat(filters), [filters]);

    const updateFilters = useCallback((updatedFilters) => {
        setFilters(updatedFilters);
    }, []);

    return [apiFilters, updateFilters];
};

UseFilter.propTypes = {
    initialFilters: PropTypes.array.isRequired,
};

export default UseFilter;