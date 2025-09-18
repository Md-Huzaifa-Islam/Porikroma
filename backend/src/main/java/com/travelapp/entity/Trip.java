package com.travelapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "trips")
public class Trip {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trip_id")
    private Long tripId;
    
    @NotBlank(message = "Title is required")
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @NotNull(message = "Start date is required")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
    
    @Positive(message = "Total budget must be positive")
    @Column(name = "total_budget", precision = 10, scale = 2)
    private BigDecimal totalBudget;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "trip_users",
        joinColumns = @JoinColumn(name = "trip_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();
    
    // Constructors
    public Trip() {}
    
    public Trip(String title, LocalDate startDate, LocalDate endDate, BigDecimal totalBudget) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalBudget = totalBudget;
    }
    
    // Getters and Setters
    public Long getTripId() {
        return tripId;
    }
    
    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public BigDecimal getTotalBudget() {
        return totalBudget;
    }
    
    public void setTotalBudget(BigDecimal totalBudget) {
        this.totalBudget = totalBudget;
    }
    
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}