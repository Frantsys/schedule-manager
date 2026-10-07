package com.unixforge.schedule_manager.modules.Catalog.repository;

import com.unixforge.schedule_manager.modules.Catalog.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CatalogRepository extends JpaRepository<Catalog, Long>, JpaSpecificationExecutor<Catalog> {

}
