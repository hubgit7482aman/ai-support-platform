package com.aman.aiassistant.pro.controller;

import com.aman.aiassistant.pro.dto.ConversationRequest;
import com.aman.aiassistant.pro.service.ConversationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @PostMapping
    public String createConversation(@Valid @RequestBody ConversationRequest request) {
        return conversationService.createConversation(request);
    }
}
