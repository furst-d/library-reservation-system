package org.furstd.web_api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.furstd.web_api.service.IFilterService;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
public class BaseController<T> {
    public Specification<T> processFilters(String filters, IFilterService<T> filterService) throws JsonProcessingException {

        Specification<T> spec = Specification.where(null);

        if (filters != null && !filters.isEmpty()) {
            String decodedFilters = URLDecoder.decode(filters, StandardCharsets.UTF_8);
            ObjectMapper mapper = new ObjectMapper();
            List<FilterCriteria> filterCriteriaList = mapper.readValue(decodedFilters, new TypeReference<>() {});

            for (FilterCriteria criteria : filterCriteriaList) {
                spec = filterService.applyFilter(spec, criteria);
            }
        }

        return spec;
    }
}
