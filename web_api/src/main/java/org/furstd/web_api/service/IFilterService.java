package org.furstd.web_api.service;

import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.jpa.domain.Specification;

public interface IFilterService<T> {
    Specification<T> applyFilter(Specification<T> spec, FilterCriteria criteria);
}
