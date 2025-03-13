package com.example.carmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reservations")
public class Reservation {

    @Id
    private String id;
    private String location;
    private String pickupDate;
    private String dropoffDate;
    private String pickupTime;
    private String contactNumber;
    private int pax;
    private boolean needDriver;
    private String carType;
    private String carModel;
    private double totalPrice;

    public Reservation() {}

    public Reservation(String location, String pickupDate, String dropoffDate, String pickupTime, String contactNumber, int pax, boolean needDriver, String carType, String carModel, double totalPrice) {
        this.location = location;
        this.pickupDate = pickupDate;
        this.dropoffDate = dropoffDate;
        this.pickupTime = pickupTime;
        this.contactNumber = contactNumber;
        this.pax = pax;
        this.needDriver = needDriver;
        this.carType = carType;
        this.carModel = carModel;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPickupDate() { return pickupDate; }
    public void setPickupDate(String pickupDate) { this.pickupDate = pickupDate; }
    public String getDropoffDate() { return dropoffDate; }
    public void setDropoffDate(String dropoffDate) { this.dropoffDate = dropoffDate; }
    public String getPickupTime() { return pickupTime; }
    public void setPickupTime(String pickupTime) { this.pickupTime = pickupTime; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public int getPax() { return pax; }
    public void setPax(int pax) { this.pax = pax; }
    public boolean isNeedDriver() { return needDriver; }
    public void setNeedDriver(boolean needDriver) { this.needDriver = needDriver; }
    public String getCarType() { return carType; }
    public void setCarType(String carType) { this.carType = carType; }
    public String getCarModel() { return carModel; }
    public void setCarModel(String carModel) { this.carModel = carModel; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}
