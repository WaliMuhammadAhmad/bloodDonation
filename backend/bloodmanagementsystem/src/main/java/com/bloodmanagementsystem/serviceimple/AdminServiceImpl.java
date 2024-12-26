package com.bloodmanagementsystem.serviceimple;

import com.google.common.base.Strings;
import com.bloodmanagementsystem.JWT.CustomerUserDetailsService;
import com.bloodmanagementsystem.JWT.JwtFilter;
import com.bloodmanagementsystem.JWT.JwtUtils;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.Model.Status;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.constents.CafeConstants;
import com.bloodmanagementsystem.DAO.AdminDao;
import com.bloodmanagementsystem.DAO.BloodAppealRepository;
import com.bloodmanagementsystem.DAO.BloodGroupRepository;
import com.bloodmanagementsystem.DAO.DonationRequestRepository;
import com.bloodmanagementsystem.DAO.UserDao;
import com.bloodmanagementsystem.service.AdminService;
import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.untils.Utils;

import lombok.extern.slf4j.Slf4j;
//import com.bloodmanagementsystem.untils.EmailUtils;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    
    //    -----------service of login
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login!");
        try{
            log.info("Authenticating user: {}", requestMap.get("email"));
            Authentication auth=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))
            );
            log.info("Authentication result: {}", auth.isAuthenticated());
            if (auth.isAuthenticated()){
              //  if(customerUserDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")){
                    return new ResponseEntity<String>("{\"token\":\""+
                            jwtUtils.generateToken(customerUserDetailsService.getUserDetail().getEmail()),HttpStatus.OK);
              //  }
             //   else {
              //      return new ResponseEntity<String>("{\"message\":\""+"Wait For Admin Approval"+"\"}", HttpStatus.BAD_REQUEST);
              //  }

            }

        }catch (Exception ex){
            log.error("Error during authentication: {}", ex.getMessage());

        }

        return new ResponseEntity<String>("{\"message\":\""+"Bad Credentials."+"\"}", HttpStatus.BAD_REQUEST);
    }

//    ------------ Donation Request Handeling
    
    @Override
    public DonationRequest approveDonationRequest(int requestId, String adminRemarks) {
        DonationRequest request = donationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Donation request not found"));

        // Check if the user donated in the last 90 days
        LocalDate lastDonationDate = request.getUser().getLastDonationDate();
        if (lastDonationDate != null && ChronoUnit.DAYS.between(lastDonationDate, LocalDate.now()) < 90) {
            throw new RuntimeException("User donated within the last 90 days. Cannot approve the request.");
        }

        // Update request status to APPROVED and add remarks
        request.setStatus(Status.APPROVED);
        request.setAdminRemarks(adminRemarks);

        // Update the user's last donation date
        request.getUser().setLastDonationDate(LocalDate.now());

        return donationRequestRepository.save(request);
    }

    @Override
    public DonationRequest rejectDonationRequest(int requestId, String adminRemarks) {
        DonationRequest request = donationRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Donation request not found"));

        // Update request status to REJECTED and add remarks
        request.setStatus(Status.REJECTED);
        request.setAdminRemarks(adminRemarks);

        return donationRequestRepository.save(request);
    }
    
    
    //  ---------------- Service of Blood Appeal Requests
    
    @Override
    public ResponseEntity<String> approveBloodAppeal(int id) {
        Optional<BloodAppeal> optionalAppeal = bloodAppealRepository.findById(id);
        if (!optionalAppeal.isPresent()) {
            return new ResponseEntity<>("Blood appeal request not found.", HttpStatus.NOT_FOUND);
        }

        BloodAppeal appeal = optionalAppeal.get();
        appeal.setStatus(Status.APPROVED);
        bloodAppealRepository.save(appeal);
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
        appeal.setRemarks(remarks != null ? remarks : "No remarks provided.");
        bloodAppealRepository.save(appeal);
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
	 //  abstract function  for Viewing Blood-Appeal Requests
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
}
