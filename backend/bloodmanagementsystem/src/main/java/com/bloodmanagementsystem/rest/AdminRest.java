package com.bloodmanagementsystem.rest;

import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.wrapper.UserWrapper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//-------admin api interface
@RequestMapping(path = "/admin")
public interface AdminRest {
	
//  --------login Api
  @PostMapping(path = "/login")
  public ResponseEntity<String> login(@RequestBody(required = true)Map<String,String> requestMap);
 
  //    Api to get All users
  @GetMapping(path = "/getusers")
  public  ResponseEntity<List<UserWrapper>> getAllUser();
  
//--------Donation Request Handeling
  
  @PostMapping("/donationrequest/approve/{id}")
  public ResponseEntity<String> approveDonationRequest(@PathVariable int id, @RequestBody Map<String, String> requestMap);
  @PostMapping("/donationrequest/reject/{id}")
  public ResponseEntity<String> rejectDonationRequest(@PathVariable int id, @RequestBody Map<String, String> requestMap);
  
//--------Blood Appeal Requests Handeling
  
  @PostMapping("/bloodappeal/approve/{id}")
  public ResponseEntity<String> approveBloodAppeal(@PathVariable int id, @RequestBody Map<String, String> requestMap);
  @PostMapping("/bloodappeal/reject/{id}")
  public ResponseEntity<String> rejectBloodAppeal(@PathVariable int id, @RequestBody Map<String, String> requestMap);
  
//--------View Blood Appeal Requests
  @GetMapping("/bloodappeals")
  public ResponseEntity<List<BloodAppeal>> getAllBloodAppeals();
  @GetMapping("/bloodappeals/status/{status}")
  public ResponseEntity<List<BloodAppeal>> getBloodAppealsByStatus(@PathVariable String status);

//--------View Blood Donation Requests
  @GetMapping("/donationrequests")
  public ResponseEntity<List<DonationRequest>> getAllDonationRequests();
  @GetMapping("/donationrequests/status/{status}")
  public ResponseEntity<List<DonationRequest>> getDonationRequestsByStatus(@PathVariable String status);

//--------Manage Inventory
  @PostMapping("/addblood")
  public ResponseEntity<String> addBloodToInventory(@RequestBody Map<String, Object> requestMap);
  @PostMapping("/removeblood")
  public ResponseEntity<String> removeBloodFromInventory(@RequestBody Map<String, Object> requestMap);
  
  
}
