package com.grievance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/health")
    public String health() {
        return "Grievance Backend is Running";
    }

    @org.springframework.beans.factory.annotation.Autowired
    private com.grievance.service.EmailService emailService;

    @GetMapping("/api/test-email")
    public String testEmail() {
        try {
            emailService.sendResolutionEmail("sachinraosahab7@gmail.com", 999L, "This is a test resolution note.");
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}
