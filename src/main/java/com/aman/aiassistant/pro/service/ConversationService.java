package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.ConversationRequest;
import com.aman.aiassistant.pro.entity.Business;
import com.aman.aiassistant.pro.entity.Conversation;
import com.aman.aiassistant.pro.exception.ResourceNotFoundException;
import com.aman.aiassistant.pro.repository.BusinessRepository;
import com.aman.aiassistant.pro.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final BusinessRepository businessRepository;

    public Conversation createConversation(ConversationRequest request) {

        Business business = businessRepository.findById(request.getBusinessId()).orElseThrow(() -> new ResourceNotFoundException("Business not found"));
        Conversation conversation = new Conversation();
        conversation.setBusiness(business);

        return conversationRepository.save(conversation);
    }

    public void deleteConversation(Long conversationId) {

        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));
        conversationRepository.delete(conversation);
    }

    public List<Conversation> getBusinessConversations(Long businessId) {

        Business business = businessRepository.findById(businessId).orElseThrow(() -> new ResourceNotFoundException("Business not found"));
        return conversationRepository.findByBusinessOrderByCreatedAtDesc(business);
    }
}