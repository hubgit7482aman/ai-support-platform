package com.aman.aiassistant.pro.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessRequest {

    @NotBlank
    private String businessName;

    private String businessInfo;

    private String industry;

    private String description;
}