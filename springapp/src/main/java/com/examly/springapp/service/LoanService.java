package com.examly.springapp.service;

import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {
 
 @Autowired
 private LoanRepo loanRepo;
 
 public Loan addLoan(Loan loan) {
 return loanRepo.save(loan);
 }
 
 public List<Loan> getAllLoans() {
 return loanRepo.findAll();
 }
 
 public Optional<Loan> getLoanById(Long id) {
 return loanRepo.findById(id);
 }
 
 public Loan updateLoan(Long id, Loan loan) {
 loan.setLoanId(id);
 return loanRepo.save(loan);
 }
 
 public void deleteLoan(Long id) {
 loanRepo.deleteById(id);
 }
 
 // Find loans by status (Day 11)
 public List<Loan> getLoansByStatus(String status) {
 return loanRepo.findByStatus(status);
 }
}