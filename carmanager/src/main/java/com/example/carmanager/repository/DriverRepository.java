package com.example.carmanager.repository;

import com.example.carmanager.entity.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, String> {
    // Custom queries can be added here if needed
}
