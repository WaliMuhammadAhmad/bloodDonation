package com.bloodmanagementsystem.rest;
import com.bloodmanagementsystem.Model.BloodInventory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/inventory")
public interface ViewInventoryRest {
	@GetMapping("/city/{city}")
	public ResponseEntity<List<BloodInventory>> getInventoryByCity(@PathVariable String city);
	
	@PostMapping("/getInventoryByBloodAndCity")
	public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(@RequestBody Map<String, String> requestMap);
	
	@GetMapping("/pendingDonations/count")
    public long getPendingDonationRequestCount();
	@GetMapping("/approvedDonations/count")
    public long getApprovedDonationRequestCount();
	@GetMapping("/rejectedDonations/count")
    public long getRejectedDonationRequestCount();
	
	 @GetMapping("/pendingAppeals/count")
	    public long getPendingBloodAppealCount();
	 @GetMapping("/approvedAppeals/count")
	    public long getApprovedBloodAppealCount();
	 @GetMapping("/rejectedAppeals/count")
	    public long getRejectedBloodAppealCount();
	
}
