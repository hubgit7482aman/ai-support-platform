package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.ConversationRequest;
import com.aman.aiassistant.pro.entity.Business;
import com.aman.aiassistant.pro.entity.Conversation;
import com.aman.aiassistant.pro.repository.BusinessRepository;
import com.aman.aiassistant.pro.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final BusinessRepository businessRepository;

    public String createConversation(ConversationRequest request) {

        Business business = businessRepository.findById(request.getBusinessId()).orElseThrow(() -> new RuntimeException("Business not found"));

        Conversation conversation = new Conversation();

        conversation.setCustomerName(request.getCustomerName());
        conversation.setCustomerEmail(request.getCustomerEmail());
        conversation.setBusiness(business);

        conversationRepository.save(conversation);

        return "Conversation created successfully";
    }
}
