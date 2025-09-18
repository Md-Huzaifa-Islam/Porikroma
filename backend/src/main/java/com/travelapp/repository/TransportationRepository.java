package com.travelapp.repository;

import com.travelapp.entity.Transportation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransportationRepository extends JpaRepository<Transportation, Long> {
    List<Transportation> findByType(String type);
    List<Transportation> findByProvider(String provider);
    List<Transportation> findByAvailability(Boolean availability);
}