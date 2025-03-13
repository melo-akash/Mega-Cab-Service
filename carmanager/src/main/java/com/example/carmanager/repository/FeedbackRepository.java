package com.example.carmanager.repository;

import com.example.carmanager.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    // You can add custom query methods if needed
}
