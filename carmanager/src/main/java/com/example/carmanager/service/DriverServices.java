package com.example.carmanager.service;

import com.example.carmanager.entity.Driver;
import com.example.carmanager.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverServices {

    @Autowired
    private DriverRepository repo;

    // Save or update a driver
    public void saveOrUpdate(Driver driver) {
        repo.save(driver);
    }

    // Get all drivers
    public Iterable<Driver> listAll() {
        return this.repo.findAll();
    }

    // Delete a driver by ID
    public void deleteDriver(String id) {
        repo.deleteById(id);
    }

    // Get driver by ID
    public Driver getDriverByID(String driverId) {
        return repo.findById(driverId).orElse(null);
    }

    // Get total number of drivers
    public long getTotalDrivers() {
        return repo.count();  // Use count() to get the number of drivers
    }
}
