package com.travelapp.service;

import com.travelapp.entity.Trip;
import com.travelapp.entity.User;
import com.travelapp.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    
    @Autowired
    private TripRepository tripRepository;
    
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }
    
    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }
    
    public List<Trip> getTripsByUser(User user) {
        return tripRepository.findByUsersContaining(user);
    }
    
    public List<Trip> getTripsByDateRange(LocalDate startDate, LocalDate endDate) {
        return tripRepository.findTripsInDateRange(startDate, endDate);
    }
    
    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }
    
    public Trip updateTrip(Long id, Trip tripDetails) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        trip.setTitle(tripDetails.getTitle());
        trip.setStartDate(tripDetails.getStartDate());
        trip.setEndDate(tripDetails.getEndDate());
        trip.setTotalBudget(tripDetails.getTotalBudget());
        
        return tripRepository.save(trip);
    }
    
    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
    
    public Trip addUserToTrip(Long tripId, User user) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        trip.getUsers().add(user);
        return tripRepository.save(trip);
    }
    
    public Trip removeUserFromTrip(Long tripId, User user) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        trip.getUsers().remove(user);
        return tripRepository.save(trip);
    }
}