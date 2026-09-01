package com.unixforge.schedule_manager.modules.schedule.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.unixforge.schedule_manager.domain.enums.ScheduleStatus;
import com.unixforge.schedule_manager.modules.catalog.model.Catalog;
import com.unixforge.schedule_manager.modules.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "schedules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id", nullable = false)
    private User professional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catalog_id", nullable = false)
    private Catalog catalog;

    @Column(nullable = false)
    private String description;

    @Column(name = "initial_date", nullable = false)
    private LocalDate initialDate;

    @Column(name = "start_time", nullable = false)
    private LocalDate startTime; 

    @Column(name = "end_time",nullable = false)
    private LocalDate endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ScheduleStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

}
