package com.unixforge.schedule_manager.modules.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.unixforge.schedule_manager.modules.catalog.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long>, JpaSpecificationExecutor<Catalog> {
    
}
