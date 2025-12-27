package com.examly.springapp.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "loans")
public class Loan {
 
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long loanId;
 
 private Double loanAmount;
 private Double interestRate;
 private Integer tenureMonths;
 private String status;
 
 @ManyToOne
 @JoinColumn(name = "customer_id")
 @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
 private Customer customer;
 
 @ManyToOne
 @JoinColumn(name = "loan_type_id")
 @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
 private LoanType loanType;
 
 public Loan() {}
 
 public Long getLoanId() {
 return loanId;
 }
 
 public void setLoanId(Long loanId) {
 this.loanId = loanId;
 }
 
 public Double getLoanAmount() {
 return loanAmount;
 }
 
 public void setLoanAmount(Double loanAmount) {
 this.loanAmount = loanAmount;
 }
 
 public Double getInterestRate() {
 return interestRate;
 }
 
 public void setInterestRate(Double interestRate) {
 this.interestRate = interestRate;
 }
 
 public Integer getTenureMonths() {
 return tenureMonths;
 }
 
 public void setTenureMonths(Integer tenureMonths) {
 this.tenureMonths = tenureMonths;
 }
 
 public String getStatus() {
 return status;
 }
 
 public void setStatus(String status) {
 this.status = status;
 }
 
 public Customer getCustomer() {
 return customer;
 }
 
 public void setCustomer(Customer customer) {
 this.customer = customer;
 }
 
 public LoanType getLoanType() {
 return loanType;
 }
 
 public void setLoanType(LoanType loanType) {
 this.loanType = loanType;
 }
}