package com.aman.aiassistant.pro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;

@Entity
@Table(name = "businesses")
@Getter
@Setter
public class Business extends BaseEntity {

    @Column(nullable = false)
    private String businessName;

    @Column(columnDefinition = "TEXT")
    private String businessInfo;

    private String industry;

    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}