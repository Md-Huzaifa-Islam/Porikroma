package com.travelapp.repository;

import com.travelapp.entity.Trip;
import com.travelapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUsersContaining(User user);
    List<Trip> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT t FROM Trip t WHERE t.startDate >= :startDate AND t.endDate <= :endDate")
    List<Trip> findTripsInDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}