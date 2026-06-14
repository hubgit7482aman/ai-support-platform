package com.aman.aiassistant.pro.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @Column(length = 200)
    private String title;

    @JsonIgnore
    @OneToMany(
            mappedBy = "conversation",
            cascade = CascadeType.ALL
    )
    private List<Message> messages;
}