package com.unixforge.schedule_manager.modules.Catalog.controller;

import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogCreateRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogFilterRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.request.CatalogUpdateActivationRequest;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogResponse;
import com.unixforge.schedule_manager.modules.Catalog.dto.response.CatalogSummaryResponse;
import com.unixforge.schedule_manager.modules.Catalog.service.CatalogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Catalog", description = "API path for managing catalogs")
@RestController
@RequestMapping("/v1/api/catalogs")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping
    public ResponseEntity<List<CatalogResponse>> findAll() {

        List<CatalogResponse> catalogs = catalogService.findAll();

        return ResponseEntity.ok(catalogs);

    }

    @GetMapping("/summary")
    public ResponseEntity<List<CatalogSummaryResponse>> findAllSummary() {

        List<CatalogSummaryResponse> catalogs = catalogService.findAllSummary();

        return ResponseEntity.ok(catalogs);

    }

    @GetMapping("/filter")
    public ResponseEntity<List<CatalogResponse>> filter(@ModelAttribute CatalogFilterRequest filter) {

        List<CatalogResponse> catalogs = catalogService.filter(filter);

        return ResponseEntity.ok(catalogs);

    }

    @GetMapping("/{id}")
    public ResponseEntity<CatalogResponse> findById(@PathVariable Long id) {

        CatalogResponse catalog = catalogService.findById(id);

        return ResponseEntity.ok(catalog);

    }

    @PostMapping
    public ResponseEntity<CatalogResponse> create(@RequestBody @Valid CatalogCreateRequest request) {

        CatalogResponse catalog = catalogService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(catalog);

    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<CatalogResponse> updateActivation(@PathVariable Long id, @RequestBody @Valid CatalogUpdateActivationRequest request) {

        CatalogResponse catalog = catalogService.updateActivationById(id, request);

        return ResponseEntity.ok(catalog);

    }

}
