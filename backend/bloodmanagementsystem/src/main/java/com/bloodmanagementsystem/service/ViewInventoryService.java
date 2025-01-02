package com.bloodmanagementsystem.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.bloodmanagementsystem.Model.BloodInventory;
import java.util.List;
import java.util.Map;

@Service
public interface ViewInventoryService {
	  //==========ViewBloodInventory by City
    ResponseEntity<List<BloodInventory>> getInventoryByCity(String city);
	  //==========ViewBloodInventory by City and BloodGroup
    ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(Map<String, String> requestMap);
    
	  //============== Donation Requests Statuses
    public long getPendingDonationRequestCount();
    public long getApprovedDonationRequestCount();
    public long getRejectedDonationRequestCount();
    
	  //============== Blood Appeals Statuses
    public long getPendingBloodAppealCount();
    public long getApprovedBloodAppealCount();
    public long getRejectedBloodAppealCount();

    
}
