package com.travelapp.repository;

import com.travelapp.entity.LocalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocalServiceRepository extends JpaRepository<LocalService, Long> {
    List<LocalService> findByType(String type);
    List<LocalService> findByNameContainingIgnoreCase(String name);
}