package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.MessageRequest;
import com.aman.aiassistant.pro.dto.MessageResponse;
import com.aman.aiassistant.pro.entity.Conversation;
import com.aman.aiassistant.pro.entity.Message;
import com.aman.aiassistant.pro.repository.ConversationRepository;
import com.aman.aiassistant.pro.repository.MessageRepository;
import com.aman.aiassistant.pro.entity.SenderType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final AIService aiService;

    public String sendMessage(MessageRequest request) {

        Conversation conversation =
                conversationRepository.findById(request.getConversationId())
                        .orElseThrow(() ->
                                new RuntimeException("Conversation not found"));

        Message message = new Message();

        message.setContent(request.getContent());
        message.setSenderType(request.getSenderType());
        message.setConversation(conversation);

        messageRepository.save(message);

        if (request.getSenderType() == SenderType.CUSTOMER) {

            String aiReply =
                    aiService.generateReply(request.getContent());

            Message aiMessage = new Message();

            aiMessage.setContent(aiReply);
            aiMessage.setSenderType(SenderType.AI);
            aiMessage.setConversation(conversation);

            messageRepository.save(aiMessage);
        }

        return "Message sent successfully";
    }

    public List<MessageResponse> getMessagesByConversation(Long conversationId) {

        List<Message> messages = messageRepository.findByConversationId(conversationId);
        return messages.stream()
                .map(message -> new MessageResponse(
                        message.getId(),
                        message.getContent(),
                        message.getSenderType()
                ))
                .toList();
    }
}
