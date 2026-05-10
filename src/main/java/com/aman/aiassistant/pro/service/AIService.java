package com.aman.aiassistant.pro.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateReply(String customerMessage, String businessInfo, String conversationHistory) {
        try {
            String requestBody = """
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": "You are an AI customer support assistant.\\n\\nUse the business information and previous conversation history to answer naturally and professionally.\\n\\nBusiness Information:\\n%s\\n\\nConversation History:\\n%s\\n\\nCurrent Customer Question:\\n%s"
                        }
                      ]
                    }
                  ]
                }
                """.formatted(businessInfo, conversationHistory, customerMessage);

            String response = webClientBuilder.build()
                    .post()
                    .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);

            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service temporarily unavailable.";
        }
    }
}