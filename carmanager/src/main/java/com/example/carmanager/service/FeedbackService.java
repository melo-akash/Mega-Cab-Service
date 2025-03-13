package com.example.carmanager.service;

import com.example.carmanager.model.Feedback;
import com.example.carmanager.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Save feedback to the database
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Retrieve all feedbacks
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
