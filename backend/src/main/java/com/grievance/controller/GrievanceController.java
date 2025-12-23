package com.grievance.controller;

import com.grievance.entity.Grievance;
import com.grievance.entity.User;
import com.grievance.repository.GrievanceRepository;
import com.grievance.repository.UserRepository;
import com.grievance.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Grievance> getUserGrievances(@PathVariable Long userId) {
        return grievanceRepository.findByUserId(userId);
    }

    @PostMapping("/add")
    public Grievance addGrievance(@RequestBody Grievance grievance) {
        // In a real app, we fetch the user from the SecurityContext
        // For now, we assume the frontend sends the user object or ID
        if (grievance.getUser() != null && grievance.getUser().getId() != null) {
            User u = userRepository.findById(grievance.getUser().getId()).orElse(null);
            grievance.setUser(u);
        }
        // Set default status if not provided
        if (grievance.getStatus() == null || grievance.getStatus().isEmpty()) {
            grievance.setStatus("Pending");
        }
        return grievanceRepository.save(grievance);
    }

    @PutMapping("/update/{id}")
    public Grievance updateGrievance(@PathVariable Long id, @RequestBody Grievance grievanceDetails) {
        return grievanceRepository.findById(id).map(grievance -> {
            if (grievanceDetails.getCategory() != null)
                grievance.setCategory(grievanceDetails.getCategory());
            if (grievanceDetails.getDescription() != null)
                grievance.setDescription(grievanceDetails.getDescription());
            if (grievanceDetails.getStatus() != null) {
                // Send email if resolving
                if ("Resolved".equals(grievanceDetails.getStatus()) && !"Resolved".equals(grievance.getStatus())) {
                    if (grievance.getUser() != null && grievance.getUser().getEmail() != null) {
                        try {
                            emailService.sendResolutionEmail(grievance.getUser().getEmail(), grievance.getId(),
                                    grievanceDetails.getResolutionNote());
                        } catch (Exception e) {
                            System.err.println("Failed to send email: " + e.getMessage());
                        }
                    }
                }
                grievance.setStatus(grievanceDetails.getStatus());
            }
            if (grievanceDetails.getRejectionReason() != null)
                grievance.setRejectionReason(grievanceDetails.getRejectionReason());
            if (grievanceDetails.getResolutionNote() != null)
                grievance.setResolutionNote(grievanceDetails.getResolutionNote());
            if (grievanceDetails.getAdminImages() != null && !grievanceDetails.getAdminImages().isEmpty())
                grievance.getAdminImages().addAll(grievanceDetails.getAdminImages());
            if (grievanceDetails.getUserImages() != null && !grievanceDetails.getUserImages().isEmpty())
                grievance.getUserImages().addAll(grievanceDetails.getUserImages());

            return grievanceRepository.save(grievance);
        }).orElseThrow(() -> new RuntimeException("Grievance not found with id " + id));
    }
}
