package com.bloodmanagementsystem.serviceimple;

import com.google.common.base.Strings;
import com.bloodmanagementsystem.Config.CustomerUserDetailsService;
import com.bloodmanagementsystem.Config.JwtFilter;
import com.bloodmanagementsystem.Config.JwtUtils;
import com.bloodmanagementsystem.Config.Log;
import com.bloodmanagementsystem.Model.Admin;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.Model.Status;
import com.bloodmanagementsystem.DAO.AdminDao;
import com.bloodmanagementsystem.DAO.BloodAppealRepository;
import com.bloodmanagementsystem.DAO.BloodGroupRepository;
import com.bloodmanagementsystem.DAO.BloodInventoryRepository;
import com.bloodmanagementsystem.DAO.DonationRequestRepository;
import com.bloodmanagementsystem.service.AdminService;

//import com.bloodmanagementsystem.untils.EmailUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {
    private static final Logger log = LoggerFactory.getLogger(AdminServiceImpl.class);
    
    @Autowired
    private AdminDao adminDao;
//
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtFilter jwtFilter;
    
    @Autowired
    private DonationRequestRepository donationRequestRepository;
    
    @Autowired
    private BloodAppealRepository bloodAppealRepository;
    @Autowired
    private BloodInventoryRepository bloodInventoryRepository;
    @Autowired
    private BloodGroupRepository bloodGroupRepository;
    
    //    -----------service of login
    @Override
    public Admin login(Map<String, String> requestMap) {
        // Extract email and password from the map
        String email = requestMap.get("email");
        String password = requestMap.get("password");

        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        // Authenticate the user
        Optional<Admin> admin = adminDao.findByEmail(email);
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return admin.get(); // Return the authenticated user
        }

        throw new IllegalArgumentException("Invalid email or password"); // Or a custom exception
    }

//    ------------ Donation Request Handeling
    
    @Override
    public ResponseEntity<String> approveDonationRequest(int requestId, String adminRemarks) {
        DonationRequest request = donationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Donation request not found"));

        // Check if the user donated in the last 90 days
        LocalDate lastDonationDate = request.getUser().getLastDonationDate();
        if (lastDonationDate != null && ChronoUnit.DAYS.between(lastDonationDate, LocalDate.now()) < 90) {
            throw new RuntimeException("User donated within the last 90 days. Cannot approve the request.");
        }

        // Update request status to APPROVED and add remarks
        request.setStatus(Status.APPROVED);
        request.setAdminRemarks(adminRemarks != null ? adminRemarks : "No remarks provided.");

        // Update the user's last donation date
        request.getUser().setLastDonationDate(LocalDate.now());

       donationRequestRepository.save(request);
       return new ResponseEntity<>("Blood Donation request Approved successfully.", HttpStatus.OK);

    }

    @Override
    public ResponseEntity<String> rejectDonationRequest(int requestId, String adminRemarks) {
        DonationRequest request = donationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Donation request not found"));

        // Update request status to REJECTED and add remarks
        request.setStatus(Status.REJECTED);
        donationRequestRepository.save(request);

        request.setAdminRemarks(adminRemarks != null ? adminRemarks : "No remarks provided.");

        return new ResponseEntity<>("Blood Donation request Rejected successfully.", HttpStatus.OK);

    }
    
    
    //  ---------------- Service of Blood Appeal Requests
    
    @Override
    public ResponseEntity<String> approveBloodAppeal(int id, String remarks) {
        Optional<BloodAppeal> optionalAppeal = bloodAppealRepository.findById(id);
        if (!optionalAppeal.isPresent()) {
            return new ResponseEntity<>("Blood appeal request not found.", HttpStatus.NOT_FOUND);
        }

        BloodAppeal appeal = optionalAppeal.get();
        appeal.setStatus(Status.APPROVED);
        bloodAppealRepository.save(appeal);
        appeal.setRemarks(remarks != null ? remarks : "No remarks provided.");
        return new ResponseEntity<>("Blood appeal request approved successfully.", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> rejectBloodAppeal(int id, String remarks) {
        Optional<BloodAppeal> optionalAppeal = bloodAppealRepository.findById(id);
        if (!optionalAppeal.isPresent()) {
            return new ResponseEntity<>("Blood appeal request not found.", HttpStatus.NOT_FOUND);
        }

        BloodAppeal appeal = optionalAppeal.get();
        appeal.setStatus(Status.REJECTED);
        bloodAppealRepository.save(appeal);
        appeal.setRemarks(remarks != null ? remarks : "No remarks provided.");
        return new ResponseEntity<>("Blood appeal request rejected successfully.", HttpStatus.OK);
    }

	 //  abstract function  for Viewing Blood-Donation Requests
    @Override
    public ResponseEntity<List<DonationRequest>> getAllDonationRequests() {
        List<DonationRequest> requests = donationRequestRepository.findAll();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<DonationRequest>> getDonationRequestsByStatus(String status) {
        List<DonationRequest> requests = donationRequestRepository.findByStatus(Status.valueOf(status.toUpperCase()));
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }
	 //   function  for Viewing Blood-Appeal Requests
    @Override
    public ResponseEntity<List<BloodAppeal>> getAllBloodAppeals() {
        List<BloodAppeal> appeals = bloodAppealRepository.findAll();
        return new ResponseEntity<>(appeals, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<List<BloodAppeal>> getBloodAppealsByStatus(String status) {
        List<BloodAppeal> appeals = bloodAppealRepository.findByStatus(Status.valueOf(status.toUpperCase()));
        return new ResponseEntity<>(appeals, HttpStatus.OK);
    }
    
	 //   functions  for Managing Blood Inventory
    //=========Add Blood to Inventory
    @Override
    public ResponseEntity<String> addBloodToInventory(Map<String, Object> requestMap) {
        try {
            String bloodGroupName = requestMap.get("bloodGroup").toString();
            String city = requestMap.get("city").toString();
            int quantity = Integer.parseInt(requestMap.get("quantity").toString());

            BloodGroup bloodGroup = bloodGroupRepository.findByBloodGroup(bloodGroupName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Blood Group"));

            BloodInventory inventory = bloodInventoryRepository.findByBloodGroupAndCity(bloodGroup, city)
                .orElse(new BloodInventory());

            inventory.setBloodGroup(bloodGroup);
            inventory.setCity(city);
            inventory.setQuantity(inventory.getQuantity() + quantity);

            bloodInventoryRepository.save(inventory);
            return new ResponseEntity<>("Blood added successfully!", HttpStatus.OK);
        } catch (Exception e) {
            Log.logError("An error occurred while processing the request.", e);
            return new ResponseEntity<>("Error adding blood: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
  //=========Remove Blood from Inventory
    
    @Override
    public ResponseEntity<String> removeBloodFromInventory(Map<String, Object> requestMap) {
        try {
            String bloodGroupName = requestMap.get("bloodGroup").toString();
            String city = requestMap.get("city").toString();
            int quantity = Integer.parseInt(requestMap.get("quantity").toString());

            BloodGroup bloodGroup = bloodGroupRepository.findByBloodGroup(bloodGroupName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Blood Group"));

            BloodInventory inventory = bloodInventoryRepository.findByBloodGroupAndCity(bloodGroup, city)
                .orElseThrow(() -> new IllegalArgumentException("No blood inventory found for the given city and blood group"));

            if (inventory.getQuantity() < quantity) {
                return new ResponseEntity<>("Not enough blood units available!", HttpStatus.BAD_REQUEST);
            }

            inventory.setQuantity(inventory.getQuantity() - quantity);
            bloodInventoryRepository.save(inventory);

            return new ResponseEntity<>("Blood removed successfully!", HttpStatus.OK);
        } catch (Exception e) {
            Log.logError("An error occurred while processing the request.", e);
            return new ResponseEntity<>("Error removing blood: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    
    
}
