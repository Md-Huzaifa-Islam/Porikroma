package com.travelapp.controller;

import com.travelapp.entity.Destination;
import com.travelapp.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinationController {
    
    @Autowired
    private DestinationService destinationService;
    
    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        Optional<Destination> destination = destinationService.getDestinationById(id);
        if (destination.isPresent()) {
            return ResponseEntity.ok(destination.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Destination> createDestination(@Valid @RequestBody Destination destination) {
        Destination savedDestination = destinationService.createDestination(destination);
        return ResponseEntity.ok(savedDestination);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable Long id, @Valid @RequestBody Destination destinationDetails) {
        try {
            Destination updatedDestination = destinationService.updateDestination(id, destinationDetails);
            return ResponseEntity.ok(updatedDestination);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinations(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location) {
        List<Destination> destinations;
        if (name != null && !name.isEmpty()) {
            destinations = destinationService.searchByName(name);
        } else if (location != null && !location.isEmpty()) {
            destinations = destinationService.searchByLocation(location);
        } else {
            destinations = destinationService.getAllDestinations();
        }
        return ResponseEntity.ok(destinations);
    }
}