package com.examly.springapp.controller;

import com.examly.springapp.model.Guarantor;
import com.examly.springapp.service.GuarantorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/guarantors")
public class GuarantorController {
    
    @Autowired
    private GuarantorService guarantorService;
    
    @PostMapping
    public ResponseEntity<Guarantor> addGuarantor(@RequestBody Guarantor guarantor) {
        Guarantor savedGuarantor = guarantorService.addGuarantor(guarantor);
        return new ResponseEntity<>(savedGuarantor, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Guarantor>> getAllGuarantors() {
        List<Guarantor> guarantors = guarantorService.getAllGuarantors();
        return new ResponseEntity<>(guarantors, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Guarantor> getGuarantorById(@PathVariable Long id) {
        Optional<Guarantor> guarantor = guarantorService.getGuarantorById(id);
        return guarantor.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Guarantor> updateGuarantor(@PathVariable Long id, @RequestBody Guarantor guarantor) {
        Guarantor updatedGuarantor = guarantorService.updateGuarantor(id, guarantor);
        return new ResponseEntity<>(updatedGuarantor, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGuarantor(@PathVariable Long id) {
        guarantorService.deleteGuarantor(id);
        return new ResponseEntity<>("Guarantor deleted successfully", HttpStatus.OK);
    }
}