package com.aman.aiassistant.pro.dto;

import com.aman.aiassistant.pro.entity.SenderType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageResponse {
    private Long id;
    private String content;
    private SenderType senderType;
}
