package com.examly.springapp.repository;

import com.examly.springapp.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepo extends JpaRepository<Loan, Long> {
 
 List<Loan> findByStatus(String status);
}