package com.bloodmanagementsystem.service;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bloodmanagementsystem.wrapper.UserWrapper;
import com.bloodmanagementsystem.Model.DonationRequest;
import java.util.List;
import java.util.Map;

@Service
public interface AdminService {
	 //  abstract function  for login
    ResponseEntity<String> login(Map<String, String> requestMap);
    
    DonationRequest approveDonationRequest(int requestId, String adminRemarks);
    DonationRequest rejectDonationRequest(int requestId, String adminRemarks);
}
