package com.unixforge.schedule_manager.modules.Catalog.service;

import com.unixforge.schedule_manager.exception.ResourceNotFoundException;
import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogCreateRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogFilterRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogResponse;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogSummaryResponse;
import com.unixforge.schedule_manager.modules.Catalog.mapper.CatalogMapper;
import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.Catalog.repository.CatalogRepository;
import com.unixforge.schedule_manager.modules.Catalog.spec.CatalogSpec;
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final CatalogRepository catalogRepository;
    private final UserRepository userRepository;
    private final CatalogMapper catalogMapper;

    @Transactional(readOnly = true)
    public List<CatalogResponse> findAll() {

        return catalogRepository.findAll()
                .stream()
                .map(catalogMapper::toResponse)
                .toList();

    }

    @Transactional(readOnly = true)
    public List<CatalogSummaryResponse> findAllSummary() {

        return catalogRepository.findAll()
                .stream()
                .map(catalogMapper::toSummaryResponse)
                .toList();

    }

    @Transactional(readOnly = true)
    public CatalogResponse findById(Long id) {

        Catalog catalog = findCatalogById(id);

        return catalogMapper.toResponse(catalog);

    }

    @Transactional(readOnly = true)
    public List<CatalogResponse> filter(CatalogFilterRequest filter) {

        Specification<Catalog> spec = Specification.unrestricted();

        if (filter.professional() != null) {
            spec = spec.and(CatalogSpec.byProfessionalId(filter.professional()));
        }

        if (filter.name() != null && !filter.name().isBlank()) {
            spec = spec.and(CatalogSpec.byName(filter.name()));
        }

        if (filter.minPrice() != null && filter.maxPrice() != null) {
            spec = spec.and(CatalogSpec.byPriceBetween(filter.minPrice(), filter.maxPrice()));
        } else if (filter.minPrice() != null) {
            spec = spec.and(CatalogSpec.byMinPrice(filter.minPrice()));
        } else if (filter.maxPrice() != null) {
            spec = spec.and(CatalogSpec.byMaxPrice(filter.maxPrice()));
        }

        if (filter.isActive() != null) {
            spec = spec.and(CatalogSpec.byActivation(filter.isActive()));
        }

        if (filter.startDate() != null && filter.endDate() != null) {
            spec = spec.and(CatalogSpec.byCreatedBetween(filter.startDate(), filter.endDate()));
        } else if (filter.startDate() != null) {
            spec = spec.and(CatalogSpec.byCreatedAfter(filter.startDate()));
        } else if (filter.endDate() != null) {
            spec = spec.and(CatalogSpec.byCreatedBefore(filter.endDate()));
        }

        return catalogRepository.findAll(spec)
                .stream()
                .map(catalogMapper::toResponse)
                .toList();

    }

    @Transactional
    public CatalogResponse create(CatalogCreateRequest request) {

        User professional = userRepository.findById(request.getProfessionalId())
                .orElseThrow(() -> new ResourceNotFoundException("Profissional não encontrado com ID: " + request.getProfessionalId()));

        Catalog catalog = catalogMapper.toEntity(request);

        catalog.setProfessional(professional);
        catalog.setIsActive(true);

        Catalog savedCatalog = catalogRepository.save(catalog);

        return catalogMapper.toResponse(savedCatalog);

    }

    @Transactional
    public CatalogResponse updateActivationById(Long id, CatalogUpdateActivationRequest request) {

        Catalog catalog = findCatalogById(id);

        catalog.setIsActive(request.getIsActive());

        Catalog updatedCatalog = catalogRepository.save(catalog);

        return catalogMapper.toResponse(updatedCatalog);

    }

    private Catalog findCatalogById(Long id) {

        return catalogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado com ID: " + id));

    }

}
