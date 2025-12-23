package com.grievance;

import com.grievance.entity.User;
import com.grievance.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GrievanceSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrievanceSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User admin = userRepository.findByEmail("sachinadmin@civil.gov").orElse(new User());
            admin.setEmail("sachinadmin@civil.gov");
            admin.setPassword(passwordEncoder.encode("goog admin 124"));
            admin.setRole("ADMIN");
            if (admin.getFullName() == null) {
                admin.setFullName("System Administrator");
                admin.setMobileNumber("0000000000");
            }
            userRepository.save(admin);
            System.out.println("Admin user ensured: sachinadmin@civil.gov / goog admin 124");
        };
    }
}
