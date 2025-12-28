package com.examly.springapp.repository;

import com.examly.springapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
 
 Optional<Customer> findByEmail(String email);
 
 List<Customer> findByCreditScoreGreaterThanEqual(Double creditScore);
}
