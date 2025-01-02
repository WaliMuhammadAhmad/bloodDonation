package com.bloodmanagementsystem.restimple;
import com.bloodmanagementsystem.Config.Log;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.rest.ViewInventoryRest;
import com.bloodmanagementsystem.service.ViewInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ViewInventoryRestImple implements ViewInventoryRest{
	 @Autowired
	    private ViewInventoryService viewInventoryService;
	 
	 @Override
	 public ResponseEntity<List<BloodInventory>> getInventoryByCity(String city) {
     	Log.logApiRequest("GET", "/inventory/city/"+city);
	        return viewInventoryService.getInventoryByCity(city);
	    }
	 @Override
	 public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(Map<String, String> requestMap) {
		    try {
	        	Log.logApiRequest("GET", "/inventory/getInventoryByBloodAndCity");
		        return viewInventoryService.getInventoryByBloodGroupAndCity(requestMap);
		    } catch (Exception e) {
		        Log.logError("An error occurred while processing the request.", e);
		        System.err.println("Error: " + e.getMessage());
		        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		}
	 
	 //--------------------------------------------------------
	 @Override
	 public long getPendingDonationRequestCount() {
	        return viewInventoryService.getPendingDonationRequestCount();
	    }
	 @Override
	 public long getApprovedDonationRequestCount() {
	        return viewInventoryService.getApprovedDonationRequestCount();
	    }
	 @Override
	 public long getRejectedDonationRequestCount() {
	        return viewInventoryService.getRejectedDonationRequestCount();
	    }
	 //-------------------------------------------------------
	 @Override
	 public long getPendingBloodAppealCount() {
	        return viewInventoryService.getPendingBloodAppealCount();
	    }
	 @Override
	 public long getApprovedBloodAppealCount() {
	        return viewInventoryService.getApprovedBloodAppealCount();
	    }
	 @Override
	 public long getRejectedBloodAppealCount() {
	        return viewInventoryService.getRejectedBloodAppealCount();
	    }
	 
}
