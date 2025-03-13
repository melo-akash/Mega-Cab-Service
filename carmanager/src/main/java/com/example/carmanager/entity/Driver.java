package com.example.carmanager.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers")
public class Driver {

    @Id
    private String _id;
    private String name;
    private String email;
    private String phoneNumber;
    private String vehicleType;
    private boolean available;

    // Constructors, Getters, Setters, and toString method
    public Driver(String _id, String name, String email, String phoneNumber, String vehicleType, boolean available) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.vehicleType = vehicleType;
        this.available = available;
    }

    public Driver() {}

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    @Override
    public String toString() {
        return "Driver{" +
                "_id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", available=" + available +
                '}';
    }
}
