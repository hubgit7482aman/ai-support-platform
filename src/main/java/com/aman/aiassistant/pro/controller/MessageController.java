package com.aman.aiassistant.pro.controller;

import com.aman.aiassistant.pro.dto.MessageRequest;
import com.aman.aiassistant.pro.dto.MessageResponse;
import com.aman.aiassistant.pro.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    public String sendMessage(@Valid @RequestBody MessageRequest request) {
        return messageService.sendMessage(request);
    }

    @GetMapping("/conversation/{conversationId}")
    public List<MessageResponse> getMessages(@PathVariable Long conversationId) {
        return messageService.getMessagesByConversation(conversationId);
    }
}
