package com.aman.aiassistant.pro.repository;

import com.aman.aiassistant.pro.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
