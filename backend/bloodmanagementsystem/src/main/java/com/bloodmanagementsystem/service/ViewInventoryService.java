package com.bloodmanagementsystem.service;

//import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bloodmanagementsystem.wrapper.UserWrapper;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import java.util.List;
import java.util.Map;

@Service
public interface ViewInventoryService {
	  //==========ViewBloodInventory by City
    ResponseEntity<List<BloodInventory>> getInventoryByCity(String city);
	  //==========ViewBloodInventory by City and BloodGroup
    ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(String bloodGroupName, String city);
}
