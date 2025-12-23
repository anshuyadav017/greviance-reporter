package com.grievance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendResolutionEmail(String toEmail, Long grievanceId, String resolutionNote) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@grievancereporter.com");
        message.setTo(toEmail);
        message.setSubject("Grievance Resolved: #" + grievanceId);
        message.setText("Dear Citizen,\n\n" +
                "Your grievance with ID #" + grievanceId + " has been successfully resolved.\n\n" +
                "Resolution Note: " + resolutionNote + "\n\n" +
                "Please log in to your dashboard to view the photographic proof and provided details.\n\n" +
                "Thank you,\n" +
                "Civil Grievance Authority");

        try {
            mailSender.send(message);
            System.out.println("✅ Email Sent Successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email to: " + toEmail);
            e.printStackTrace();
        }
    }
}
