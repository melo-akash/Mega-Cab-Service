package com.example.carmanager.controller;

import com.example.carmanager.model.Car;
import com.example.carmanager.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
@RestController
@RequestMapping("/api/cars")
public class CarController {

    private  static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private CarService carService;

    // POST: Add a new car
    @PostMapping
    public ResponseEntity<Car> addCar(@RequestParam("make") String make,
                                      @RequestParam("model") String model,
                                      @RequestParam("year") int year,
                                      @RequestParam("carType") String carType,
                                      @RequestParam("licensePlateNumber") String licensePlateNumber,
                                      @RequestParam("color") String color,
                                      @RequestParam("fuelType") String fuelType,
                                      @RequestParam("transmissionType") String transmissionType,
                                      @RequestParam("seatingCapacity") int seatingCapacity,
                                      @RequestParam("available") boolean available,
                                      @RequestParam("dailyRentalPrice") double dailyRentalPrice,
                                      @RequestParam("image") MultipartFile image,
                                      @RequestParam("driverName") String driverName,
                                      @RequestParam("driverLocation") String driverLocation,
                                      @RequestParam("licenseNumber") String licenseNumber) {
        try {
            String imageUrl = saveImage(image);  // Save the image and get the URL
            Car car = new Car(make, model, year, carType, licensePlateNumber, color, fuelType, transmissionType,
                    seatingCapacity, available, dailyRentalPrice, imageUrl, driverName, driverLocation, licenseNumber);
            Car savedCar = carService.addCar(car);
            return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET: Get all cars
    @GetMapping
    public ResponseEntity<Iterable<Car>> getAllCars() {
        try {
            Iterable<Car> cars = carService.getAllCars();
            return new ResponseEntity<>(cars, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // PUT: Update a car
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable String id, @RequestBody Car carDetails) {
        try {
            Car updatedCar = carService.updateCar(id, carDetails);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE: Remove a car
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable String id) {
        try {
            carService.deleteCar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Save image to the server


    // Method to handle image saving
    private String saveImage(MultipartFile image) throws IOException {
        // Clean the original file name to avoid malicious characters
        String imageName = StringUtils.cleanPath(image.getOriginalFilename());

        // Check if file already exists and append a timestamp or random number to make it unique
        Path imagePath = Paths.get(UPLOAD_DIR + imageName);
        if (Files.exists(imagePath)) {
            // Append timestamp to the filename to make it unique
            String timestamp = String.valueOf(System.currentTimeMillis());
            imageName = timestamp + "_" + imageName;
            imagePath = Paths.get(UPLOAD_DIR + imageName);
        }

        // Save the file
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        return imagePath.toString();
    }
}
