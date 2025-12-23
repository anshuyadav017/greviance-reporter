package com.grievance.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "grievances")
public class Grievance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String description;
    private String status; // Pending, In Progress, Resolved
    private boolean isReadByAuthority;
    private LocalDate dateRaised;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String rejectionReason;

    @Column(length = 1000)
    private String resolutionNote;

    @ElementCollection
    @CollectionTable(name = "grievance_user_images", joinColumns = @JoinColumn(name = "grievance_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private java.util.List<String> userImages = new java.util.ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "grievance_admin_images", joinColumns = @JoinColumn(name = "grievance_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private java.util.List<String> adminImages = new java.util.ArrayList<>();

    public Grievance() {
    }

    public Grievance(String category, String description, User user) {
        this.category = category;
        this.description = description;
        this.user = user;
        this.status = "Pending";
        this.isReadByAuthority = false;
        this.dateRaised = LocalDate.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isReadByAuthority() {
        return isReadByAuthority;
    }

    public void setReadByAuthority(boolean readByAuthority) {
        isReadByAuthority = readByAuthority;
    }

    public LocalDate getDateRaised() {
        return dateRaised;
    }

    public void setDateRaised(LocalDate dateRaised) {
        this.dateRaised = dateRaised;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getResolutionNote() {
        return resolutionNote;
    }

    public void setResolutionNote(String resolutionNote) {
        this.resolutionNote = resolutionNote;
    }

    public java.util.List<String> getUserImages() {
        return userImages;
    }

    public void setUserImages(java.util.List<String> userImages) {
        this.userImages = userImages;
    }

    public java.util.List<String> getAdminImages() {
        return adminImages;
    }

    public void setAdminImages(java.util.List<String> adminImages) {
        this.adminImages = adminImages;
    }
}
