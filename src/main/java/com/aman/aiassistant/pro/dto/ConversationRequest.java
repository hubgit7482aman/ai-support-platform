package com.aman.aiassistant.pro.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationRequest {

    @NotNull(message = "Business ID is required")
    private Long businessId;
}