package com.aman.aiassistant.pro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation extends BaseEntity {

    private String customerName;
    private String customerEmail;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @OneToMany(
            mappedBy = "conversation",
            cascade = CascadeType.ALL
    )
    private List<Message> messages;
}