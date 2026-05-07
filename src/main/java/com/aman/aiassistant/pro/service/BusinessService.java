package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.BusinessRequest;
import com.aman.aiassistant.pro.entity.Business;
import com.aman.aiassistant.pro.entity.User;
import com.aman.aiassistant.pro.repository.BusinessRepository;
import com.aman.aiassistant.pro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    public String createBusiness(BusinessRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Business business = new Business();

        business.setBusinessName(request.getBusinessName());
        business.setIndustry(request.getIndustry());
        business.setDescription(request.getDescription());
        business.setOwner(user);

        businessRepository.save(business);

        return "Business created successfully";
    }
}