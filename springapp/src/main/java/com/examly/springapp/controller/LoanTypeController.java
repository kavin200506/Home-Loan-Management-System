package com.examly.springapp.controller;

import com.examly.springapp.model.LoanType;
import com.examly.springapp.service.LoanTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loantypes")
public class LoanTypeController {
    
    @Autowired
    private LoanTypeService loanTypeService;
    
    @PostMapping
    public ResponseEntity<LoanType> addLoanType(@RequestBody LoanType loanType) {
        LoanType savedLoanType = loanTypeService.addLoanType(loanType);
        return new ResponseEntity<>(savedLoanType, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<LoanType>> getAllLoanTypes() {
        List<LoanType> loanTypes = loanTypeService.getAllLoanTypes();
        return new ResponseEntity<>(loanTypes, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LoanType> getLoanTypeById(@PathVariable Long id) {
        Optional<LoanType> loanType = loanTypeService.getLoanTypeById(id);
        return loanType.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LoanType> updateLoanType(@PathVariable Long id, @RequestBody LoanType loanType) {
        LoanType updatedLoanType = loanTypeService.updateLoanType(id, loanType);
        return new ResponseEntity<>(updatedLoanType, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoanType(@PathVariable Long id) {
        loanTypeService.deleteLoanType(id);
        return new ResponseEntity<>("LoanType deleted successfully", HttpStatus.OK);
    }
}
