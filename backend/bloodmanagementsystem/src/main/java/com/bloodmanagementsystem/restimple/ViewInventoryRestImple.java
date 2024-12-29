package com.bloodmanagementsystem.restimple;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.constents.CafeConstants;
import com.bloodmanagementsystem.rest.UserRest;
import com.bloodmanagementsystem.rest.ViewInventoryRest;
import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.service.ViewInventoryService;
import com.bloodmanagementsystem.untils.Utils;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ViewInventoryRestImple implements ViewInventoryRest{
	 @Autowired
	    private ViewInventoryService viewInventoryService;
	 
	 @Override
	 public ResponseEntity<List<BloodInventory>> getInventoryByCity(String city) {
	        return viewInventoryService.getInventoryByCity(city);
	    }
	 @Override
	 public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(String bloodGroup, String city) {
	     // Replace + with %2B to preserve the + character during decoding
	     String fixedBloodGroup = bloodGroup.replace("+", "%2B");
	     
	     // Decode the parameter correctly
	     String decodedBloodGroup = URLDecoder.decode(fixedBloodGroup, StandardCharsets.UTF_8);
	     
	     // Call the service method with the decoded blood group and city
	     return viewInventoryService.getInventoryByBloodGroupAndCity(decodedBloodGroup, city);
	 }
}
