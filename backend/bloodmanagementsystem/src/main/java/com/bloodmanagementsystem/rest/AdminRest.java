package com.bloodmanagementsystem.rest;

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
 
//--------Donation Request Handeling
  
  @PostMapping("/approve/{id}")
  public ResponseEntity<String> approveDonationRequest(@PathVariable int id, @RequestBody Map<String, String> requestMap);
  @PostMapping("/reject/{id}")
  public ResponseEntity<String> rejectDonationRequest(@PathVariable int id, @RequestBody Map<String, String> requestMap);
}
