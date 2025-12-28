package com.examly.springapp.controller;

import com.examly.springapp.model.Customer;
import com.examly.springapp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
 
 @Autowired
 private CustomerService customerService;
 
 @PostMapping
 public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
 Customer savedCustomer = customerService.addCustomer(customer);
 return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
 }

 
 
 @GetMapping
 public ResponseEntity<List<Customer>> getAllCustomers() {
 List<Customer> customers = customerService.getAllCustomers();
 return new ResponseEntity<>(customers, HttpStatus.OK);
 }
 
 @GetMapping("/{id}")
 public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
 Optional<Customer> customer = customerService.getCustomerById(id);
 return customer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
 .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 
 @PutMapping("/{id}")
 public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
 Customer updatedCustomer = customerService.updateCustomer(id, customer);
 return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
 }
 
 @DeleteMapping("/{id}")
 public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
 customerService.deleteCustomer(id);
 return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
 }
 
 @GetMapping("/page/{page}/{size}")
 public ResponseEntity<Page<Customer>> getCustomersWithPagination(
 @PathVariable int page, 
 @PathVariable int size) {
 Page<Customer> customers = customerService.getCustomersWithPagination(page, size);
 return new ResponseEntity<>(customers, HttpStatus.OK);
 }

 @GetMapping("/email/{email}")
 public ResponseEntity<String> getCustomerByEmail(@PathVariable String email) {
 Optional<Customer> customer = customerService.getCustomerByEmail(email);
 
 if (customer.isPresent()) {
 return ResponseEntity.ok()
 .body("{\"customerId\":" + customer.get().getCustomerId() + 
 ",\"customerName\":\"" + customer.get().getCustomerName() + 
 "\",\"email\":\"" + customer.get().getEmail() + 
 "\",\"phoneNumber\":\"" + customer.get().getPhoneNumber() + 
 "\",\"address\":\"" + customer.get().getAddress() + 
 "\",\"creditScore\":" + customer.get().getCreditScore() + "}");
 }
 
 return new ResponseEntity<>("Customer not found with email: " + email, HttpStatus.NOT_FOUND);
 }
 
 @GetMapping("/creditScore/{creditScore}")
 public ResponseEntity<?> getCustomersByCreditScore(@PathVariable Double creditScore) {
 List<Customer> customers = customerService.getCustomersByCreditScore(creditScore);
 
 if (customers.isEmpty()) {
 return new ResponseEntity<>("No customers found with credit score >= " + creditScore, HttpStatus.NOT_FOUND);
 }
 
 return new ResponseEntity<>(customers, HttpStatus.OK);
 }
}