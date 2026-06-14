package com.aman.aiassistant.pro.controller;

import com.aman.aiassistant.pro.dto.ConversationRequest;
import org.springframework.http.ResponseEntity;
import com.aman.aiassistant.pro.entity.Conversation;
import com.aman.aiassistant.pro.service.ConversationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @PostMapping
    public ResponseEntity<Conversation> createConversation(@RequestBody ConversationRequest request) {
        return ResponseEntity.ok(conversationService.createConversation(request));
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Conversation>> getBusinessConversations(@PathVariable Long businessId) {
        return ResponseEntity.ok(conversationService.getBusinessConversations(businessId));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<String> deleteConversation(@PathVariable Long conversationId) {
        conversationService.deleteConversation(conversationId);
        return ResponseEntity.ok("Conversation deleted successfully");
    }
}
