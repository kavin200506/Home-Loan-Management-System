package com.examly.springapp.service;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepo paymentRepo;
    
    public Payment addPayment(Payment payment) {
        return paymentRepo.save(payment);
    }
    
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }
    
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepo.findById(id);
    }
    
    public Payment updatePayment(Long id, Payment payment) {
        payment.setPaymentId(id);
        return paymentRepo.save(payment);
    }
    
    public void deletePayment(Long id) {
        paymentRepo.deleteById(id);
    }
}