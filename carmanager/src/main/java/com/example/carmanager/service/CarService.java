package com.example.carmanager.service;

import com.example.carmanager.model.Car;
import com.example.carmanager.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    // Add a new car
    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    // Get all cars
    public Iterable<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Update a car
    public Car updateCar(String id, Car carDetails) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();
            car.setMake(carDetails.getMake());
            car.setModel(carDetails.getModel());
            car.setYear(carDetails.getYear());
            car.setCarType(carDetails.getCarType());
            car.setLicensePlateNumber(carDetails.getLicensePlateNumber());
            car.setColor(carDetails.getColor());
            car.setFuelType(carDetails.getFuelType());
            car.setTransmissionType(carDetails.getTransmissionType());
            car.setSeatingCapacity(carDetails.getSeatingCapacity());
            car.setAvailable(carDetails.isAvailable());
            car.setDailyRentalPrice(carDetails.getDailyRentalPrice());
            car.setImageUrl(carDetails.getImageUrl());
            car.setDriverName(carDetails.getDriverName());
            car.setDriverLocation(carDetails.getDriverLocation());
            car.setLicenseNumber(carDetails.getLicenseNumber());
            return carRepository.save(car);
        } else {
            throw new RuntimeException("Car not found with ID: " + id);
        }
    }

    // Delete a car by ID
    public void deleteCar(String id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
        } else {
            throw new RuntimeException("Car not found with ID: " + id);
        }
    }
}
