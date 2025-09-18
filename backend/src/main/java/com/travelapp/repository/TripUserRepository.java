package com.travelapp.repository;

import com.travelapp.entity.TripUser;
import com.travelapp.entity.Trip;
import com.travelapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TripUserRepository extends JpaRepository<TripUser, Long> {
    List<TripUser> findByTrip(Trip trip);
    List<TripUser> findByUser(User user);
}