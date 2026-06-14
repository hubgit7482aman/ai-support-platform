package com.aman.aiassistant.pro.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateReply(String customerMessage, String businessInfo, String conversationHistory) {
        try {
            String prompt = """
                    You are an AI customer support assistant.

                    BUSINESS INFORMATION:
                    %s

                    PREVIOUS CONVERSATION:
                    %s

                    CUSTOMER MESSAGE:
                    %s

                    Rules:
                    - Reply professionally.
                    - Reply briefly and clearly.
                    - Use markdown formatting when useful.
                    - If business information is unavailable,
                      politely say you don't know.
                    """
                    .formatted(businessInfo, conversationHistory, customerMessage);

            Map<String, Object> requestBody =
                    Map.of(
                            "contents",
                            List.of(
                                    Map.of(
                                            "parts",
                                            List.of(
                                                    Map.of(
                                                            "text",
                                                            prompt
                                                    )
                                            )
                                    )
                            )
                    );

            String response = webClientBuilder
                    .build()
                    .post()
                    .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root=objectMapper.readTree(response);

            JsonNode textNode = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            if (textNode == null) {
                return "AI could not generate response.";
            }
            return textNode.asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "AI service temporarily unavailable.";
        }
    }
}