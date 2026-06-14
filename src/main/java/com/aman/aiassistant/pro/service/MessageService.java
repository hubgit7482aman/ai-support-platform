package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.MessageRequest;
import com.aman.aiassistant.pro.dto.MessageResponse;
import com.aman.aiassistant.pro.entity.Conversation;
import com.aman.aiassistant.pro.entity.Message;
import com.aman.aiassistant.pro.exception.ResourceNotFoundException;
import com.aman.aiassistant.pro.repository.ConversationRepository;
import com.aman.aiassistant.pro.repository.MessageRepository;
import com.aman.aiassistant.pro.entity.SenderType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final AIService aiService;

    public String sendMessage(MessageRequest request) {

        Conversation conversation = conversationRepository.findById(request.getConversationId()).orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        Message message = new Message();

        message.setContent(request.getContent());
        message.setSenderType(request.getSenderType());
        message.setConversation(conversation);
        messageRepository.save(message);

        List<Message> previousMessages = messageRepository.findTop10ByConversationIdOrderByCreatedAtDesc(request.getConversationId());
        Collections.reverse(previousMessages);

        StringBuilder conversationHistory = new StringBuilder();
        for (Message msg : previousMessages) {
            conversationHistory.append(msg.getSenderType())
                    .append(": ")
                    .append(msg.getContent())
                    .append("\n");
        }

        if (request.getSenderType() == SenderType.CUSTOMER) {
            if (conversation.getTitle() == null || conversation.getTitle().isBlank()) {
                String content = request.getContent().trim();
                String generatedTitle =
                        content.length() > 40
                                ? content.substring(0, 40) + "..."
                                : content;

                conversation.setTitle(generatedTitle);
                conversationRepository.save(conversation);
            }
            String aiReply = aiService.generateReply(request.getContent(), conversation.getBusiness().getBusinessInfo(), conversationHistory.toString());

            if (!aiReply.equals("AI service temporarily unavailable.")) {
                Message aiMessage = new Message();
                aiMessage.setContent(aiReply);
                aiMessage.setSenderType(SenderType.AI);
                aiMessage.setConversation(conversation);
                messageRepository.save(aiMessage);
            }
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
