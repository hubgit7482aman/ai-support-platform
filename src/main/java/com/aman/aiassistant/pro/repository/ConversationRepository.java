package com.aman.aiassistant.pro.repository;

import com.aman.aiassistant.pro.entity.Business;
import com.aman.aiassistant.pro.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByBusinessOrderByCreatedAtDesc(Business business);
}