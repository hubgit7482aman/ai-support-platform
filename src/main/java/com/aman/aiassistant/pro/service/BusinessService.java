package com.aman.aiassistant.pro.service;

import com.aman.aiassistant.pro.dto.BusinessDetailsResponse;
import com.aman.aiassistant.pro.dto.BusinessRequest;
import com.aman.aiassistant.pro.entity.Business;
import com.aman.aiassistant.pro.entity.User;
import com.aman.aiassistant.pro.exception.ResourceNotFoundException;
import com.aman.aiassistant.pro.repository.BusinessRepository;
import com.aman.aiassistant.pro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.aman.aiassistant.pro.dto.BusinessResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    public String createBusiness(BusinessRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Business business = new Business();

        business.setBusinessName(request.getBusinessName());
        business.setIndustry(request.getIndustry());
        business.setDescription(request.getDescription());
        business.setOwner(user);
        business.setBusinessInfo(request.getBusinessInfo());

        businessRepository.save(business);

        return "Business created successfully";
    }
    public List<BusinessResponse> getUserBusinesses(User user) {
        List<Business> businesses = businessRepository.findByOwner(user);
        return businesses.stream()
                .map(business -> new BusinessResponse(
                        business.getId(),
                        business.getBusinessName(),
                        business.getIndustry(),
                        business.getDescription()
                )).toList();
    }

    public BusinessResponse updateBusiness(Long businessId, BusinessRequest request, Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Business business = businessRepository.findById(businessId).orElseThrow(() -> new ResourceNotFoundException("Business not found"));

        if (!business.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to edit this business");
        }

        business.setBusinessName(request.getBusinessName());
        business.setIndustry(request.getIndustry());
        business.setDescription(request.getDescription());
        business.setBusinessInfo(request.getBusinessInfo());

        Business updatedBusiness = businessRepository.save(business);

        return new BusinessResponse(
                updatedBusiness.getId(),
                updatedBusiness.getBusinessName(),
                updatedBusiness.getIndustry(),
                updatedBusiness.getDescription()
        );
    }

    public BusinessDetailsResponse getBusinessById(Long businessId, Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Business business = businessRepository.findById(businessId).orElseThrow(() -> new ResourceNotFoundException("Business not found"));

        if (!business.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to view this business");
        }

        return new BusinessDetailsResponse(
                business.getId(),
                business.getBusinessName(),
                business.getIndustry(),
                business.getDescription(),
                business.getBusinessInfo()
        );
    }

    public void deleteBusiness(Long businessId, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Business business = businessRepository.findById(businessId).orElseThrow(() -> new ResourceNotFoundException("Business not found"));

        if (!business.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this business");
        }
        businessRepository.delete(business);
    }
}