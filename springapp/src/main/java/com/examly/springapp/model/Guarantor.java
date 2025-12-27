package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "guarantors")
public class Guarantor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guarantorId;
    
    private String guarantorName;
    private String email;
    private String phoneNumber;
    private String address;
    private Double creditScore;
    
    public Guarantor() {}
    
    public Long getGuarantorId() {
        return guarantorId;
    }
    
    public void setGuarantorId(Long guarantorId) {
        this.guarantorId = guarantorId;
    }
    
    public String getGuarantorName() {
        return guarantorName;
    }
    
    public void setGuarantorName(String guarantorName) {
        this.guarantorName = guarantorName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public Double getCreditScore() {
        return creditScore;
    }
    
    public void setCreditScore(Double creditScore) {
        this.creditScore = creditScore;
    }
}
