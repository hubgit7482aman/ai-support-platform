package com.aman.aiassistant.pro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;

@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private SenderType senderType;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;
}
