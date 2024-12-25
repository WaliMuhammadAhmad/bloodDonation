package com.bloodmanagementsystem.restimple;

import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.constents.CafeConstants;
import com.bloodmanagementsystem.rest.AdminRest;
import com.bloodmanagementsystem.rest.UserRest;
import com.bloodmanagementsystem.service.AdminService;
import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.untils.Utils;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class AdminRestImpl implements AdminRest {
	
	   @Autowired
	    AdminService adminService;
	   	   
	   //---------Api implementation for login
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
        	System.out.println(requestMap);
            return adminService.login(requestMap);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return Utils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
//  ----------------------- Donation Request Handeling
    
@Override
public ResponseEntity<String> approveDonationRequest(int id, Map<String, String> requestMap) {
    String adminRemarks = requestMap.get("remarks");
    adminService.approveDonationRequest(id, adminRemarks);
    return ResponseEntity.ok("Donation request approved successfully.");
}

@Override
public ResponseEntity<String> rejectDonationRequest(int id, Map<String, String> requestMap) {
    String adminRemarks = requestMap.get("remarks");
    adminService.rejectDonationRequest(id, adminRemarks);
    return ResponseEntity.ok("Donation request rejected successfully.");
}

}
