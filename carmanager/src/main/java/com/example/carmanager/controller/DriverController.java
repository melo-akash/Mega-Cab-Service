package com.example.carmanager.controller;

import com.example.carmanager.entity.Driver;
import com.example.carmanager.service.DriverServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/driver")
public class DriverController {

    @Autowired
    private DriverServices driverServices;

    // Save a new driver
    @PostMapping(value = "/save")
    private String saveDriver(@RequestBody Driver driver) {
        driverServices.saveOrUpdate(driver);
        return driver.get_id();
    }

    // Get all drivers
    @GetMapping(value = "/getall")
    public Iterable<Driver> getDrivers() {
        return driverServices.listAll();
    }

    // Update driver information
    @PutMapping(value = "/edit/{id}")
    private Driver updateDriver(@RequestBody Driver driver, @PathVariable(name = "id") String _id) {
        driver.set_id(_id);
        driverServices.saveOrUpdate(driver);
        return driver;
    }

    // Delete a driver by ID
    @DeleteMapping("/delete/{id}")
    private void deleteDriver(@PathVariable("id") String _id) {
        driverServices.deleteDriver(_id);
    }

    // Get driver by ID
    @RequestMapping("/search/{id}")
    private Driver getDriver(@PathVariable(name = "id") String driverId) {
        return driverServices.getDriverByID(driverId);
    }

    // New method to get total count of drivers
    @GetMapping("/total-drivers")
    public int getTotalDrivers() {
        try {
            // Fetch total number of drivers by getting the size of the list
            return (int) driverServices.listAll().spliterator().getExactSizeIfKnown();
        } catch (Exception e) {
            return 0; // Return 0 if there is an error fetching the total drivers
        }
    }
}
