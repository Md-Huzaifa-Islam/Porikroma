package com.travelapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long expenseId;
    
    @NotBlank(message = "Category is required")
    @Column(name = "category", nullable = false, length = 50)
    private String category;
    
    @Positive(message = "Amount must be positive")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;
    
    // Constructors
    public Expense() {}
    
    public Expense(String category, BigDecimal amount, LocalDate date) {
        this.category = category;
        this.amount = amount;
        this.date = date;
    }
    
    // Getters and Setters
    public Long getExpenseId() {
        return expenseId;
    }
    
    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
}