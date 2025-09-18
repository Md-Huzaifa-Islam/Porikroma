package com.travelapp.service;

import com.travelapp.entity.Destination;
import com.travelapp.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }
    
    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }
    
    public List<Destination> searchByName(String name) {
        return destinationRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Destination> searchByLocation(String location) {
        return destinationRepository.findByLocationContainingIgnoreCase(location);
    }
    
    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
    
    public Destination updateDestination(Long id, Destination destinationDetails) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
        
        destination.setName(destinationDetails.getName());
        destination.setLocation(destinationDetails.getLocation());
        destination.setDescription(destinationDetails.getDescription());
        
        return destinationRepository.save(destination);
    }
    
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
}