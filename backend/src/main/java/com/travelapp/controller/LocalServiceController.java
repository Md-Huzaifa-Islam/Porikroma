package com.travelapp.controller;

import com.travelapp.entity.LocalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/local-services")
@CrossOrigin(origins = "http://localhost:5173")
public class LocalServiceController {
    
    // Mock data for now - replace with actual service when implemented
    @GetMapping
    public ResponseEntity<List<LocalService>> getAllLocalServices() {
        List<LocalService> services = Arrays.asList(
            createMockService(1L, "Cox's Bazar Guide", "Tour Guide", "+880-1234567890"),
            createMockService(2L, "Sylhet Tea Tours", "Tour Guide", "+880-1234567891"),
            createMockService(3L, "Sajek Adventure", "Adventure Guide", "+880-1234567892"),
            createMockService(4L, "Sundarban Wildlife Tours", "Wildlife Guide", "+880-1234567893"),
            createMockService(5L, "Dhaka City Tours", "City Guide", "+880-1234567894")
        );
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LocalService> getLocalServiceById(@PathVariable Long id) {
        LocalService service = createMockService(id, "Sample Guide", "Tour Guide", "+880-1234567890");
        return ResponseEntity.ok(service);
    }
    
    private LocalService createMockService(Long id, String name, String type, String contact) {
        LocalService service = new LocalService();
        service.setServiceId(id);
        service.setName(name);
        service.setType(type);
        service.setContact(contact);
        return service;
    }
}