package com.examly.springapp.service;

import com.examly.springapp.model.Customer;
import com.examly.springapp.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
 
 @Autowired
 private CustomerRepo customerRepo;
 
 public Customer addCustomer(Customer customer) {
 return customerRepo.save(customer);
 }
 
 public List<Customer> getAllCustomers() {
 return customerRepo.findAll();
 }
 
 public Optional<Customer> getCustomerById(Long id) {
 return customerRepo.findById(id);
 }
 
 public Customer updateCustomer(Long id, Customer customer) {
 customer.setCustomerId(id);
 return customerRepo.save(customer);
 }
 
 public void deleteCustomer(Long id) {
 customerRepo.deleteById(id);
 }
 
 public Page<Customer> getCustomersWithPagination(int page, int size) {
 Pageable pageable = PageRequest.of(page, size);
 return customerRepo.findAll(pageable);
 }
 
 // Find customer by email (Day 12)
 public Optional<Customer> getCustomerByEmail(String email) {
 return customerRepo.findByEmail(email);
 }
 
 // Find customers by credit score >= value (Day 12)
 public List<Customer> getCustomersByCreditScore(Double creditScore) {
 return customerRepo.findByCreditScoreGreaterThanEqual(creditScore);
 }
}