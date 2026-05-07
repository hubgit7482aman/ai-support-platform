package com.aman.aiassistant.pro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "businesses")
@Getter
@Setter
public class Business extends BaseEntity {

    @Column(nullable = false)
    private String businessName;

    private String industry;

    private String description;

    @OneToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}