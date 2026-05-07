package com.aman.aiassistant.pro.dto;

import com.aman.aiassistant.pro.entity.SenderType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {

    private Long conversationId;

    @NotBlank
    private String content;

    private SenderType senderType;
}
