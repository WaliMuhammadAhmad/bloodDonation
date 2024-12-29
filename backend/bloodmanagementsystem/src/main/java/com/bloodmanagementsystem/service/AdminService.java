package com.bloodmanagementsystem.service;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bloodmanagementsystem.wrapper.UserWrapper;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import java.util.List;
import java.util.Map;

@Service
public interface AdminService {
	 //  abstract function  for login
    ResponseEntity<String> login(Map<String, String> requestMap);
    
	 //  abstract function  for Donation requests handeling

    DonationRequest approveDonationRequest(int requestId, String adminRemarks);
    DonationRequest rejectDonationRequest(int requestId, String adminRemarks);
    
	 //  abstract function  for Blood Appeal requests handeling

    ResponseEntity<String> approveBloodAppeal(int id);
    ResponseEntity<String> rejectBloodAppeal(int id, String remarks);
    
	 //  abstract function  for Viewing Blood-Appeal Requests
    ResponseEntity<List<BloodAppeal>> getAllBloodAppeals();
    ResponseEntity<List<BloodAppeal>> getBloodAppealsByStatus(String status);
    
	 //  abstract functions  for Viewing Blood-Donation Requests
    ResponseEntity<List<DonationRequest>> getAllDonationRequests();
    ResponseEntity<List<DonationRequest>> getDonationRequestsByStatus(String status);
    
	 //  abstract functions  for Managing Blood Inventory
    ResponseEntity<String> addBloodToInventory(Map<String, Object> requestMap);
    ResponseEntity<String> removeBloodFromInventory(Map<String, Object> requestMap);
    
  //==========ViewBloodInventory by City
}
