package com.travelapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "transportation")
public class Transportation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transportation_id")
    private Long transportationId;
    
    @NotBlank(message = "Type is required")
    @Column(name = "type", nullable = false, length = 50)
    private String type;
    
    @NotBlank(message = "Provider is required")
    @Column(name = "provider", nullable = false, length = 100)
    private String provider;
    
    @Positive(message = "Price must be positive")
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "availability")
    private Boolean availability;
    
    // Constructors
    public Transportation() {}
    
    public Transportation(String type, String provider, BigDecimal price, Boolean availability) {
        this.type = type;
        this.provider = provider;
        this.price = price;
        this.availability = availability;
    }
    
    // Getters and Setters
    public Long getTransportationId() {
        return transportationId;
    }
    
    public void setTransportationId(Long transportationId) {
        this.transportationId = transportationId;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getProvider() {
        return provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Boolean getAvailability() {
        return availability;
    }
    
    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}