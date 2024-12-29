package com.bloodmanagementsystem.rest;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/inventory")
public interface ViewInventoryRest {
	@GetMapping("/city/{city}")
	public ResponseEntity<List<BloodInventory>> getInventoryByCity(@PathVariable String city);
	
	@GetMapping("/filter")
	public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(@RequestParam String bloodGroup, @RequestParam String city);
	
}
