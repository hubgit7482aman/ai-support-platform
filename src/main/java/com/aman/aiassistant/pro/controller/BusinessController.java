package com.aman.aiassistant.pro.controller;

import com.aman.aiassistant.pro.dto.BusinessDetailsResponse;
import com.aman.aiassistant.pro.dto.BusinessResponse;
import com.aman.aiassistant.pro.repository.UserRepository;
import com.aman.aiassistant.pro.dto.BusinessRequest;
import com.aman.aiassistant.pro.service.BusinessService;
import com.aman.aiassistant.pro.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {
    private final BusinessService businessService;
    private final UserRepository userRepository;

    @PostMapping
    public String createBusiness(@Valid @RequestBody BusinessRequest request, Authentication authentication) {
        return businessService.createBusiness(request, authentication);
    }

    @GetMapping("/my-businesses")
    public ResponseEntity<?> getMyBusinesses(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(businessService.getUserBusinesses(user));
    }

    @PutMapping("/{businessId}")
    public ResponseEntity<BusinessResponse> updateBusiness(@PathVariable Long businessId, @Valid @RequestBody BusinessRequest request, Authentication authentication) {
        return ResponseEntity.ok(businessService.updateBusiness(businessId, request, authentication));
    }

    @GetMapping("/{businessId}")
    public ResponseEntity<BusinessDetailsResponse> getBusinessById(@PathVariable Long businessId, Authentication authentication) {
        return ResponseEntity.ok(businessService.getBusinessById(businessId, authentication)
        );
    }

    @DeleteMapping("/{businessId}")
    public ResponseEntity<String> deleteBusiness(@PathVariable Long businessId, Authentication authentication) {
        businessService.deleteBusiness(businessId, authentication);
        return ResponseEntity.ok("Business deleted successfully");
    }
}