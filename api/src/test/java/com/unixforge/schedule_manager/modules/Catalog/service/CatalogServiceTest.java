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
import com.unixforge.schedule_manager.modules.User.model.User;
import com.unixforge.schedule_manager.modules.User.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CatalogServiceTest {

    @Mock
    private CatalogRepository catalogRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CatalogMapper catalogMapper;

    @InjectMocks
    private CatalogService catalogService;

    @Test
    @DisplayName("create should link the professional and activate the catalog")
    void create_shouldLinkProfessionalAndActivate() {
        CatalogCreateRequest request = new CatalogCreateRequest();
        request.setProfessionalId(1L);

        User professional = new User();
        Catalog mappedCatalog = new Catalog();
        CatalogResponse response = new CatalogResponse();

        when(userRepository.findById(1L)).thenReturn(Optional.of(professional));
        when(catalogMapper.toEntity(request)).thenReturn(mappedCatalog);
        when(catalogRepository.save(mappedCatalog)).thenReturn(mappedCatalog);
        when(catalogMapper.toResponse(mappedCatalog)).thenReturn(response);

        CatalogResponse result = catalogService.create(request);

        assertThat(result).isSameAs(response);
        assertThat(mappedCatalog.getProfessional()).isSameAs(professional);
        assertThat(mappedCatalog.getIsActive()).isTrue();
    }

    @Test
    @DisplayName("create should throw an exception when the professional does not exist")
    void create_shouldThrowExceptionWhenProfessionalNotFound() {
        CatalogCreateRequest request = new CatalogCreateRequest();
        request.setProfessionalId(99L);

        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> catalogService.create(request));

        verify(catalogRepository, never()).save(any());
    }

    @Test
    @DisplayName("findAll should return every catalog mapped to CatalogResponse")
    void findAll_shouldReturnMappedCatalogs() {
        Catalog catalog = new Catalog();
        CatalogResponse response = new CatalogResponse();

        when(catalogRepository.findAll()).thenReturn(List.of(catalog));
        when(catalogMapper.toResponse(catalog)).thenReturn(response);

        assertThat(catalogService.findAll()).containsExactly(response);
    }

    @Test
    @DisplayName("findAllSummary should return every catalog mapped to CatalogSummaryResponse")
    void findAllSummary_shouldReturnMappedSummaries() {
        Catalog catalog = new Catalog();
        CatalogSummaryResponse summary = new CatalogSummaryResponse();

        when(catalogRepository.findAll()).thenReturn(List.of(catalog));
        when(catalogMapper.toSummaryResponse(catalog)).thenReturn(summary);

        assertThat(catalogService.findAllSummary()).containsExactly(summary);
    }

    @Test
    @DisplayName("findById should return the mapped catalog when found")
    void findById_shouldReturnCatalog() {
        Catalog catalog = new Catalog();
        CatalogResponse response = new CatalogResponse();

        when(catalogRepository.findById(1L)).thenReturn(Optional.of(catalog));
        when(catalogMapper.toResponse(catalog)).thenReturn(response);

        assertThat(catalogService.findById(1L)).isSameAs(response);
    }

    @Test
    @DisplayName("findById should throw an exception when the catalog does not exist")
    void findById_shouldThrowExceptionWhenNotFound() {
        when(catalogRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> catalogService.findById(99L));
    }

    @Test
    @DisplayName("filter should query the repository with a specification and map the results")
    @SuppressWarnings("unchecked")
    void filter_shouldReturnMappedCatalogs() {
        CatalogFilterRequest filter = new CatalogFilterRequest(1L, "hair", 10.0, 50.0, true, null, null);
        Catalog catalog = new Catalog();
        CatalogResponse response = new CatalogResponse();

        when(catalogRepository.findAll(any(Specification.class))).thenReturn(List.of(catalog));
        when(catalogMapper.toResponse(catalog)).thenReturn(response);

        assertThat(catalogService.filter(filter)).containsExactly(response);
    }

    @Test
    @DisplayName("updateActivationById should update the catalog's isActive flag")
    void updateActivationById_shouldUpdateActivationStatus() {
        Catalog catalog = new Catalog();
        catalog.setIsActive(true);

        CatalogUpdateActivationRequest request = new CatalogUpdateActivationRequest();
        request.setIsActive(false);

        when(catalogRepository.findById(1L)).thenReturn(Optional.of(catalog));
        when(catalogRepository.save(catalog)).thenReturn(catalog);
        when(catalogMapper.toResponse(catalog)).thenReturn(new CatalogResponse());

        catalogService.updateActivationById(1L, request);

        assertThat(catalog.getIsActive()).isFalse();
        verify(catalogRepository).save(catalog);
    }

}
