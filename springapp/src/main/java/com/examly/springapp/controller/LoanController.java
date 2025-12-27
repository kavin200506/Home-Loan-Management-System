package com.examly.springapp.controller;

import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
 
 @Autowired
 private LoanService loanService;
 
 @PostMapping
 public ResponseEntity<Loan> addLoan(@RequestBody Loan loan) {
 Loan savedLoan = loanService.addLoan(loan);
 return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);
 }
 
 @GetMapping
 public ResponseEntity<List<Loan>> getAllLoans() {
 List<Loan> loans = loanService.getAllLoans();
 return new ResponseEntity<>(loans, HttpStatus.OK);
 }
 
 @GetMapping("/{id}")
 public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
 Optional<Loan> loan = loanService.getLoanById(id);
 return loan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
 .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 
 @PutMapping("/{id}")
 public ResponseEntity<Loan> updateLoan(@PathVariable Long id, @RequestBody Loan loan) {
 Loan updatedLoan = loanService.updateLoan(id, loan);
 return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
 }
 
 @DeleteMapping("/{id}")
 public ResponseEntity<String> deleteLoan(@PathVariable Long id) {
 loanService.deleteLoan(id);
 return new ResponseEntity<>("Loan deleted successfully", HttpStatus.OK);
 }
 
 // Get loans by status (Test 53 - Day 11)
 @GetMapping("/status/{status}")
 public ResponseEntity<?> getLoansByStatus(@PathVariable String status) {
 List<Loan> loans = loanService.getLoansByStatus(status);
 
 if (loans.isEmpty()) {
 return new ResponseEntity<>("No loans found with status: " + status, HttpStatus.NO_CONTENT);
 }
 
 return new ResponseEntity<>(loans, HttpStatus.OK);
 }
}