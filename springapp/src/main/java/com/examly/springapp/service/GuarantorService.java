package com.examly.springapp.service;

import com.examly.springapp.model.Guarantor;
import com.examly.springapp.repository.GuarantorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuarantorService {
    
    @Autowired
    private GuarantorRepo guarantorRepo;
    
    public Guarantor addGuarantor(Guarantor guarantor) {
        return guarantorRepo.save(guarantor);
    }
    
    public List<Guarantor> getAllGuarantors() {
        return guarantorRepo.findAll();
    }
    
    public Optional<Guarantor> getGuarantorById(Long id) {
        return guarantorRepo.findById(id);
    }
    
    public Guarantor updateGuarantor(Long id, Guarantor guarantor) {
        guarantor.setGuarantorId(id);
        return guarantorRepo.save(guarantor);
    }
    
    public void deleteGuarantor(Long id) {
        guarantorRepo.deleteById(id);
    }
}