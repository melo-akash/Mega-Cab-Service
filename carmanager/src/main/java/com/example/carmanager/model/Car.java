package com.example.carmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
public class Car {
    @Id
    private String id;
    private String make;
    private String model;
    private int year;
    private String carType;
    private String licensePlateNumber;
    private String color;
    private String fuelType;
    private String transmissionType;
    private int seatingCapacity;
    private boolean available;
    private double dailyRentalPrice;
    private String imageUrl;
    private String driverName;
    private String driverLocation;
    private String licenseNumber;

    // Default constructor
    public Car() {}

    // Full constructor
    public Car(String make, String model, int year, String carType, String licensePlateNumber, String color,
               String fuelType, String transmissionType, int seatingCapacity, boolean available, double dailyRentalPrice,
               String imageUrl, String driverName, String driverLocation, String licenseNumber) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.carType = carType;
        this.licensePlateNumber = licensePlateNumber;
        this.color = color;
        this.fuelType = fuelType;
        this.transmissionType = transmissionType;
        this.seatingCapacity = seatingCapacity;
        this.available = available;
        this.dailyRentalPrice = dailyRentalPrice;
        this.imageUrl = imageUrl;
        this.driverName = driverName;
        this.driverLocation = driverLocation;
        this.licenseNumber = licenseNumber;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCarType() {
        return carType;
    }

    public void setCarType(String carType) {
        this.carType = carType;
    }

    public String getLicensePlateNumber() {
        return licensePlateNumber;
    }

    public void setLicensePlateNumber(String licensePlateNumber) {
        this.licensePlateNumber = licensePlateNumber;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getTransmissionType() {
        return transmissionType;
    }

    public void setTransmissionType(String transmissionType) {
        this.transmissionType = transmissionType;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(int seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public double getDailyRentalPrice() {
        return dailyRentalPrice;
    }

    public void setDailyRentalPrice(double dailyRentalPrice) {
        this.dailyRentalPrice = dailyRentalPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverLocation() {
        return driverLocation;
    }

    public void setDriverLocation(String driverLocation) {
        this.driverLocation = driverLocation;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }
}
