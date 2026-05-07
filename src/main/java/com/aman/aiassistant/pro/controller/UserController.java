package com.aman.aiassistant.pro.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/user/profile")
    public String profile() {
        return "Protected profile endpoint";
    }
}
