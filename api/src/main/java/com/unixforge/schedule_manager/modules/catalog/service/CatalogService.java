package com.unixforge.schedule_manager.modules.catalog.service;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unixforge.schedule_manager.modules.catalog.dto.CatalogCreateDTO;
import com.unixforge.schedule_manager.modules.catalog.dto.CatalogFilterDTO;
import com.unixforge.schedule_manager.modules.catalog.dto.CatalogResponseDTO;
import com.unixforge.schedule_manager.modules.catalog.dto.CatalogStatusUpdateDTO;
import com.unixforge.schedule_manager.modules.catalog.mapper.CatalogMapper;
import com.unixforge.schedule_manager.modules.catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.catalog.repository.CatalogRepository;
import com.unixforge.schedule_manager.modules.catalog.specification.CatalogSpecification;
import com.unixforge.schedule_manager.modules.user.entity.User;
import com.unixforge.schedule_manager.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CatalogService {
    
    private final CatalogRepository catalogRepository;
    private final UserRepository userRepository;
    private final CatalogMapper catalogMapper;

    @Transactional
    public CatalogResponseDTO create(CatalogCreateDTO requestDTO) {

        User professional = userRepository.findById(requestDTO.getProfessionalId())
            .orElseThrow(() -> new RuntimeException("Profissional não encontrado com ID " + requestDTO.getProfessionalId()));

        Catalog catalog = catalogMapper.toEntity(requestDTO);
        catalog.setProfessional(professional);

        Catalog savedCatalog = catalogRepository.save(catalog);

        return catalogMapper.toDTO(savedCatalog);

    }

    @Transactional(readOnly = true)
    public List<CatalogResponseDTO> findAll() {
        return catalogRepository.findAll()
            .stream()
            .map(catalogMapper::toDTO)
            .toList();
    }

    @Transactional(readOnly = true)
    public CatalogResponseDTO findById(Long id) {

        Catalog catalog = catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não foi encontrado com ID"  + id));

        return catalogMapper.toDTO(catalog);

    }

    @Transactional
    public CatalogResponseDTO updateStatusById(Long id, CatalogStatusUpdateDTO requestDTO) {
        Catalog catalog = catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID " + id));

        catalog.setIsActive(requestDTO.getIsActive());

        Catalog updatedCatalog = catalogRepository.save(catalog);

        return catalogMapper.toDTO(updatedCatalog);
    }

    @Transactional(readOnly = true)
    public List<CatalogResponseDTO> listCatalogs(CatalogFilterDTO requestDTO) {
        Specification<Catalog> spec = Specification.unrestricted();

        if(requestDTO.professional() != null) {
            spec = spec.and(CatalogSpecification.byProfessionalId(requestDTO.professional()));
        }

        if(requestDTO.name() != null) {
            spec = spec.and(CatalogSpecification.byName(requestDTO.name()));
        }

        if(requestDTO.minPrice() != null && requestDTO.maxPrice() == null) {
            spec = spec.and(CatalogSpecification.byPriceGreater(requestDTO.minPrice()));
        }

        if(requestDTO.minPrice() == null && requestDTO.maxPrice() != null) {
            spec = spec.and(CatalogSpecification.byPriceLess(requestDTO.maxPrice()));
        }

        if(requestDTO.isActive() != null) {
            spec = spec.and(CatalogSpecification.byActivation(requestDTO.isActive()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() == null) {
            spec = spec.and(CatalogSpecification.byCreatedAfter(requestDTO.startDate()));
        }

        if(requestDTO.startDate() == null && requestDTO.endDate() != null) {
            spec = spec.and(CatalogSpecification.byCreatedBefore(requestDTO.endDate()));
        }

        if(requestDTO.startDate() != null && requestDTO.endDate() != null) {
            spec = spec.and(CatalogSpecification.byCreatedBetween(requestDTO.startDate(), requestDTO.endDate()));
        }

        return catalogRepository.findAll(spec)
            .stream()
            .map(catalogMapper::toDTO)
            .toList();
    }

}
