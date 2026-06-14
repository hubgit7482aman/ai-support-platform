package com.aman.aiassistant.pro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BusinessResponse {

    private Long id;

    private String businessName;

    private String industry;

    private String description;
}