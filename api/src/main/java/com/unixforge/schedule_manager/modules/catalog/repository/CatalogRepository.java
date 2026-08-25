package com.unixforge.schedule_manager.modules.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unixforge.schedule_manager.modules.catalog.model.Catalog;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Long> {
    
}
