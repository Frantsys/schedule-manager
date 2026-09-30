package com.unixforge.schedule_manager.modules.catalog.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unixforge.schedule_manager.modules.catalog.dto.request.CatalogCreateRequest;
import com.unixforge.schedule_manager.modules.catalog.dto.request.CatalogStatusActivationRequest;
import com.unixforge.schedule_manager.modules.catalog.dto.response.CatalogFilterResponse;
import com.unixforge.schedule_manager.modules.catalog.dto.response.CatalogResponse;
import com.unixforge.schedule_manager.modules.catalog.service.CatalogService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@Tag(name = "Catalog", description = "API for managing catalogs")
@RestController
@RequestMapping("/v1/api/catalogs")
@RequiredArgsConstructor
public class CatalogController {
    
    private final CatalogService catalogService;

    @PostMapping
    public ResponseEntity<CatalogResponse> create(@RequestBody @Valid CatalogCreateRequest DTO) {
        CatalogResponse createdCatalog = catalogService.create(DTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdCatalog);
    }

    @GetMapping
    public ResponseEntity<List<CatalogResponse>> findAll() {
        List<CatalogResponse> catalogs = catalogService.findAll();

        return ResponseEntity.ok(catalogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CatalogResponse> findById(@PathVariable Long id) {
        CatalogResponse catalog = catalogService.findById(id);

        return ResponseEntity.ok(catalog);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CatalogResponse> updateStatusById(@PathVariable Long id, @RequestBody @Valid CatalogStatusActivationRequest DTO) {
        CatalogResponse catalog = catalogService.updateStatusById(id, DTO);

        return ResponseEntity.ok(catalog);
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<CatalogResponse>> listCatalogs(@RequestParam CatalogFilterResponse filterDTO) {
        List<CatalogResponse> catalogs = catalogService.listCatalogs(filterDTO);

        return ResponseEntity.ok(catalogs);
    }
    
    

}
