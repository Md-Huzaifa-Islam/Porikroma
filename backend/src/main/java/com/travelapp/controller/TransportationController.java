package com.travelapp.controller;

import com.travelapp.entity.Transportation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/transportation")
@CrossOrigin(origins = "http://localhost:5173")
public class TransportationController {
    
    // Mock data for now - replace with actual service when implemented
    @GetMapping
    public ResponseEntity<List<Transportation>> getAllTransportation() {
        List<Transportation> transportation = Arrays.asList(
            createMockTransportation(1L, "Bus", "Green Line", new BigDecimal("1200"), true),
            createMockTransportation(2L, "Train", "Bangladesh Railway", new BigDecimal("800"), true),
            createMockTransportation(3L, "Flight", "Biman Bangladesh", new BigDecimal("8000"), true),
            createMockTransportation(4L, "Car Rental", "Rental Cars BD", new BigDecimal("3000"), true),
            createMockTransportation(5L, "Boat", "River Transport", new BigDecimal("500"), true)
        );
        return ResponseEntity.ok(transportation);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transportation> getTransportationById(@PathVariable Long id) {
        Transportation transport = createMockTransportation(id, "Bus", "Sample Transport", new BigDecimal("1200"), true);
        return ResponseEntity.ok(transport);
    }
    
    private Transportation createMockTransportation(Long id, String type, String provider, BigDecimal price, Boolean availability) {
        Transportation transportation = new Transportation();
        transportation.setTransportationId(id);
        transportation.setType(type);
        transportation.setProvider(provider);
        transportation.setPrice(price);
        transportation.setAvailability(availability);
        return transportation;
    }
}