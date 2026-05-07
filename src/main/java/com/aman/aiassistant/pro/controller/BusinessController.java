package com.aman.aiassistant.pro.controller;

import com.aman.aiassistant.pro.dto.BusinessRequest;
import com.aman.aiassistant.pro.service.BusinessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;

    @PostMapping
    public String createBusiness(@Valid @RequestBody BusinessRequest request, Authentication authentication) {

        return businessService.createBusiness(
                request,
                authentication
        );
    }
}