package com.travelapp.repository;

import com.travelapp.entity.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByType(String type);
    List<Accommodation> findByRatingGreaterThanEqual(Integer rating);
    List<Accommodation> findByNameContainingIgnoreCase(String name);
}