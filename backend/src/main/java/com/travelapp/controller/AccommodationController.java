package com.travelapp.controller;

import com.travelapp.entity.Accommodation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@CrossOrigin(origins = "http://localhost:5173")
public class AccommodationController {
    
    // Mock data for now - replace with actual service when implemented
    @GetMapping
    public ResponseEntity<List<Accommodation>> getAllAccommodations() {
        List<Accommodation> accommodations = Arrays.asList(
            createMockAccommodation(1L, "Hotel Sea Crown", "Resort", new BigDecimal("8000"), 4),
            createMockAccommodation(2L, "Cox's Bazar Resort", "Resort", new BigDecimal("12000"), 5),
            createMockAccommodation(3L, "Sylhet Guest House", "Hotel", new BigDecimal("5000"), 3),
            createMockAccommodation(4L, "Sajek Hill Resort", "Resort", new BigDecimal("15000"), 4),
            createMockAccommodation(5L, "Sundarban Lodge", "Lodge", new BigDecimal("6000"), 3)
        );
        return ResponseEntity.ok(accommodations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> getAccommodationById(@PathVariable Long id) {
        Accommodation accommodation = createMockAccommodation(id, "Sample Hotel", "Hotel", new BigDecimal("8000"), 4);
        return ResponseEntity.ok(accommodation);
    }
    
    private Accommodation createMockAccommodation(Long id, String name, String type, BigDecimal price, Integer rating) {
        Accommodation accommodation = new Accommodation();
        accommodation.setHotelId(id);
        accommodation.setName(name);
        accommodation.setType(type);
        accommodation.setPricePerNight(price);
        accommodation.setRating(rating);
        return accommodation;
    }
}