package com.unixforge.schedule_manager.modules.catalog.model;

import java.time.Duration;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.unixforge.schedule_manager.modules.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "catalogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Catalog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id", nullable = false)
    private User professional;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Duration duration;

    @Column(nullable = false)
    private Double price;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

}
