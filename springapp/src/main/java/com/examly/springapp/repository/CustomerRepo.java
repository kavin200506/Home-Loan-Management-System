package com.examly.springapp.repository;

import com.examly.springapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
 
 // Find customer by email
 Optional<Customer> findByEmail(String email);
 
 // Find customers with credit score >= given value
 List<Customer> findByCreditScoreGreaterThanEqual(Double creditScore);
}
