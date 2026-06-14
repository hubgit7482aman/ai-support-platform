package com.aman.aiassistant.pro.repository;

import com.aman.aiassistant.pro.entity.User;
import com.aman.aiassistant.pro.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    List<Business> findByOwner(User owner);
}
