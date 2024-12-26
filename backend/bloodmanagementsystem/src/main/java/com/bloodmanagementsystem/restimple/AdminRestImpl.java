package com.bloodmanagementsystem.restimple;

import com.bloodmanagementsystem.Model.BloodAppeal;
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
	    @Autowired
	    UserService userService;
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

//---------Api implementation for Blood Appeal Requests Handelling

@Override
public ResponseEntity<String> approveBloodAppeal(int id) {
    return adminService.approveBloodAppeal(id);
}
@Override
public ResponseEntity<String> rejectBloodAppeal(int id, Map<String, String> requestMap) {
    return adminService.rejectBloodAppeal(id, requestMap.get("remarks"));
}

//---------Api implementation for get all users
@Override
public ResponseEntity<List<UserWrapper>> getAllUser() {
    try {
        List<UserWrapper> userList = userService.getAllUser().getBody();
        System.out.println("Controller Response: " + userList);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
//--------Api implementation for Viewing Blood-Appeal Requests
public ResponseEntity<List<BloodAppeal>> getAllBloodAppeals() {
    return adminService.getAllBloodAppeals();
}

public ResponseEntity<List<BloodAppeal>> getBloodAppealsByStatus(String status) {
    return adminService.getBloodAppealsByStatus(status);
}

//--------Api implementation for Viewing Blood-Donation Requests
public ResponseEntity<List<DonationRequest>> getAllDonationRequests() {
    return adminService.getAllDonationRequests();
}
public ResponseEntity<List<DonationRequest>> getDonationRequestsByStatus(String status) {
    return adminService.getDonationRequestsByStatus(status);
}



}
