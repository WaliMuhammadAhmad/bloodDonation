package com.bloodmanagementsystem.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.bloodmanagementsystem.Model.Admin;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.DonationRequest;

import java.util.List;
import java.util.Map;

@Service
public interface AdminService {
	 //  abstract function  for login
    public Admin login(Map<String, String> requestMap);
    
	 //  abstract function  for Donation requests handeling

    ResponseEntity<String> approveDonationRequest(int requestId, String adminRemarks);
    ResponseEntity<String> rejectDonationRequest(int requestId, String adminRemarks);
    
	 //  abstract function  for Blood Appeal requests handeling

    ResponseEntity<String> approveBloodAppeal(int id, String remarks);
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
