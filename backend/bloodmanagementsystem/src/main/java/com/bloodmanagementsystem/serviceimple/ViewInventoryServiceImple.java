package com.bloodmanagementsystem.serviceimple;
import com.google.common.base.Strings;
import com.bloodmanagementsystem.JWT.CustomerUserDetailsService;
import com.bloodmanagementsystem.JWT.JwtFilter;
import com.bloodmanagementsystem.JWT.JwtUtils;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.Model.Status;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.constents.CafeConstants;
import com.bloodmanagementsystem.DAO.AdminDao;
import com.bloodmanagementsystem.DAO.BloodAppealRepository;
import com.bloodmanagementsystem.DAO.BloodGroupRepository;
import com.bloodmanagementsystem.DAO.BloodInventoryRepository;
import com.bloodmanagementsystem.DAO.DonationRequestRepository;
import com.bloodmanagementsystem.DAO.UserDao;
import com.bloodmanagementsystem.service.AdminService;
import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.service.ViewInventoryService;
import com.bloodmanagementsystem.untils.Utils;

import lombok.extern.slf4j.Slf4j;
//import com.bloodmanagementsystem.untils.EmailUtils;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class ViewInventoryServiceImple implements ViewInventoryService {
	 @Autowired
	    private BloodInventoryRepository bloodInventoryRepository;
	 @Autowired
	    private BloodGroupRepository bloodGroupRepository;
	 
	    @Override
	    public ResponseEntity<List<BloodInventory>> getInventoryByCity(String city) {
	        try {
	            List<BloodInventory> inventoryList = bloodInventoryRepository.findByCity(city);
	            if (inventoryList.isEmpty()) {
	                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	            }
	            return new ResponseEntity<>(inventoryList, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    @Override
	    public ResponseEntity<BloodInventory> getInventoryByBloodGroupAndCity(String bloodGroupName, String city) {
	        try {
	            System.out.println("Requested BloodGroup: " + bloodGroupName);
	            System.out.println("Requested City: " + city);

	            BloodGroup bloodGroup = bloodGroupRepository.findByBloodGroup(bloodGroupName)
	                    .orElseThrow(() -> new IllegalArgumentException("Invalid Blood Group: " + bloodGroupName));
	            System.out.println("Found BloodGroup: " + bloodGroup.getBloodGroupID() + ", " + bloodGroup.getBloodGroup());

	            BloodInventory inventory = bloodInventoryRepository.findByBloodGroupAndCity(bloodGroup, city)
	                    .orElseThrow(() -> new IllegalArgumentException("No inventory found for BloodGroup: " 
	                            + bloodGroup.getBloodGroup() + " in city: " + city));
	            System.out.println("Found Inventory: ID = " + inventory.getInventoryID() + ", Quantity = " + inventory.getQuantity());

	            return new ResponseEntity<>(inventory, HttpStatus.OK);
	        } catch (IllegalArgumentException e) {
	            System.err.println("Error: " + e.getMessage());
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	        } catch (Exception e) {
	            System.err.println("Error: " + e.getMessage());
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }


	    
}
