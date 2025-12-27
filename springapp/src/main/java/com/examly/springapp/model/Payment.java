package com.examly.springapp.model;

import java.sql.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
    
    private Double amount;
    private Date paymentDate;
    
    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loan loan;
    
    public Payment() {}
    
    public Long getPaymentId() {
        return paymentId;
    }
    
    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }
    
    public Double getAmount() {
        return amount;
    }
    
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    
    public Date getPaymentDate() {
        return paymentDate;
    }
    
    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }
    
    public Loan getLoan() {
        return loan;
    }
    
    public void setLoan(Loan loan) {
        this.loan = loan;
    }
}
