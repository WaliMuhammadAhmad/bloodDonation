package com.bloodmanagementsystem.serviceimple;

import com.google.common.base.Strings;
import com.bloodmanagementsystem.Config.Log;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.Status;
import com.bloodmanagementsystem.DAO.BloodAppealRepository;
import com.bloodmanagementsystem.DAO.BloodGroupRepository;
import com.bloodmanagementsystem.DAO.BloodInventoryRepository;
import com.bloodmanagementsystem.DAO.DonationRequestRepository;
import com.bloodmanagementsystem.service.ViewInventoryService;
//import com.bloodmanagementsystem.untils.EmailUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ViewInventoryServiceImple implements ViewInventoryService {
	 @Autowired
	    private BloodInventoryRepository bloodInventoryRepository;
	 @Autowired
	    private BloodGroupRepository bloodGroupRepository;
	 @Autowired
	    private DonationRequestRepository donationRequestRepository;
	 @Autowired
	    private BloodAppealRepository bloodAppealRepository;

	 
	    @Override
	    public ResponseEntity<List<BloodInventory>> getInventoryByCity(String city) {
	        try {
	            List<BloodInventory> inventoryList = bloodInventoryRepository.findByCity(city);
	            if (inventoryList.isEmpty()) {
	                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	            }
	            return new ResponseEntity<>(inventoryList, HttpStatus.OK);
	        } catch (Exception e) {
	            Log.logError("An error occurred while processing the request.", e);
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    @Override
	    public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(Map<String, String> requestMap) {
	        try {
	            // Extract bloodGroupName and city from the request map
	            String bloodGroupName = requestMap.get("bloodGroupName");
	            String city = requestMap.get("city");

	            System.out.println("Requested BloodGroup: " + bloodGroupName);
	            System.out.println("Requested City: " + city);

	            // Validate the inputs
	            if (bloodGroupName == null || city == null) {
	                throw new IllegalArgumentException("Blood group name and city are required.");
	            }

	            // Find the BloodGroup entity
	            BloodGroup bloodGroup = bloodGroupRepository.findByBloodGroup(bloodGroupName)
	                    .orElseThrow(() -> new IllegalArgumentException("Invalid Blood Group: " + bloodGroupName));
	            System.out.println("Found BloodGroup: " + bloodGroup.getBloodGroupID() + ", " + bloodGroup.getBloodGroup());

	            // Find the BloodInventory entity
	            BloodInventory inventory = bloodInventoryRepository.findByBloodGroupAndCity(bloodGroup, city)
	                    .orElseThrow(() -> new IllegalArgumentException("No inventory found for BloodGroup: "
	                            + bloodGroup.getBloodGroup() + " in city: " + city));
	            System.out.println("Found Inventory: ID = " + inventory.getInventoryID() + ", Quantity = " + inventory.getQuantity());

	            // Return the found inventory
	            return new ResponseEntity<>(inventory, HttpStatus.OK);
	        } catch (IllegalArgumentException e) {
	            Log.logError("An error occurred while processing the request.", e);
	            System.err.println("Error: " + e.getMessage());
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	        } catch (Exception e) {
	            Log.logError("An error occurred while processing the request.", e);
	            System.err.println("Error: " + e.getMessage());
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
		  //============== Donation Requests Statuses
	    @Override
	    public long getPendingDonationRequestCount() {
	        return donationRequestRepository.countByStatus(Status.PENDING);
	    }
	    @Override
	    public long getApprovedDonationRequestCount() {
	        return donationRequestRepository.countByStatus(Status.APPROVED);
	    }
	    @Override
	    public long getRejectedDonationRequestCount() {
	        return donationRequestRepository.countByStatus(Status.REJECTED);
	    }
	    
		  //============== Blood Appeals Statuses
	    @Override
	    public long getPendingBloodAppealCount() {
	        return bloodAppealRepository.countByStatus(Status.PENDING);
	    }
	    @Override
	    public long getApprovedBloodAppealCount() {
	        return bloodAppealRepository.countByStatus(Status.APPROVED);
	    }
	    @Override
	    public long getRejectedBloodAppealCount() {
	        return bloodAppealRepository.countByStatus(Status.REJECTED);
	    }
}
