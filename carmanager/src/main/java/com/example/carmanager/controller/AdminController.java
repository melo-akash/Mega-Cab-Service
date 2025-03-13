package com.example.carmanager.controller;

import com.example.carmanager.model.Admin;
import com.example.carmanager.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public String registerAdmin(@RequestBody Admin admin) {
        boolean isRegistered = adminService.registerAdmin(admin);
        if (isRegistered) {
            return "Admin registered successfully!";
        }
        return "Registration failed: Username already exists.";
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {
        boolean isLoggedIn = adminService.authenticateAdmin(admin);
        if (isLoggedIn) {
            return "Login successful!";
        }
        return "Invalid username or password.";
    }
}
