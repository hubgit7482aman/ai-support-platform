package com.aman.aiassistant.pro.dto;

import lombok.Getter;
import java.util.List;

@Getter
public class OpenAIResponse {

    private List<Choice> choices;

    @Getter
    public static class Choice {
        private Message message;
    }

    @Getter
    public static class Message {
        private String content;
    }
}