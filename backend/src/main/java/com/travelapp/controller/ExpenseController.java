package com.travelapp.controller;

import com.travelapp.entity.Expense;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    
    // Mock data for now - replace with actual service when implemented
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Expense>> getExpensesByTripId(@PathVariable Long tripId) {
        List<Expense> expenses = Arrays.asList(
            createMockExpense(1L, tripId, "Hotel", new BigDecimal("5000.00")),
            createMockExpense(2L, tripId, "Transport", new BigDecimal("15000.00")),
            createMockExpense(3L, tripId, "Food", new BigDecimal("2000.00")),
            createMockExpense(4L, tripId, "Activities", new BigDecimal("3000.00")),
            createMockExpense(5L, tripId, "Shopping", new BigDecimal("2500.00"))
        );
        return ResponseEntity.ok(expenses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Expense expense = createMockExpense(id, 1L, "Misc", new BigDecimal("1000.00"));
        return ResponseEntity.ok(expense);
    }
    
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        // Mock creation - assign ID
        expense.setExpenseId(System.currentTimeMillis());
        expense.setDate(LocalDate.now());
        return ResponseEntity.ok(expense);
    }
    
    private Expense createMockExpense(Long id, Long tripId, String category, BigDecimal amount) {
        Expense expense = new Expense();
        expense.setExpenseId(id);
        expense.setCategory(category);
        expense.setAmount(amount);
        expense.setDate(LocalDate.now());
        return expense;
    }
}