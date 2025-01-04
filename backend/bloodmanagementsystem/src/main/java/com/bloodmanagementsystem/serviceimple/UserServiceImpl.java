package com.bloodmanagementsystem.serviceimple;

import com.google.common.base.Strings;
import com.bloodmanagementsystem.Config.CustomerUserDetailsService;
import com.bloodmanagementsystem.Config.JwtFilter;
import com.bloodmanagementsystem.Config.JwtUtils;
import com.bloodmanagementsystem.Config.Log;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.Model.Status;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.constants.constants;
import com.bloodmanagementsystem.DAO.BloodAppealRepository;
import com.bloodmanagementsystem.DAO.BloodGroupRepository;
import com.bloodmanagementsystem.DAO.DonationRequestRepository;
import com.bloodmanagementsystem.DAO.UserDao;

import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.utils.Utils;

//import com.bloodmanagementsystem.untils.EmailUtils;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {


    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserDao userDao;
//
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtFilter jwtFilter;
    @Autowired
    private BloodAppealRepository bloodAppealRepository;

    @Autowired
    private BloodGroupRepository bloodGroupRepository;
    
    @Autowired
    private DonationRequestRepository donationRequestRepository;
  
//    @Autowired
//    private EmailUtils emailUtils;

//----------service of signup
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signUp: {}", requestMap);
        try {
            if (validateSignUp(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {

                    userDao.save(getUserFromMap(requestMap));
                    return new ResponseEntity<>("User successfully signed up.", HttpStatus.OK);
                } else {
                    return Utils.getResponseEntity("Email already exist.", HttpStatus.BAD_REQUEST);
                }

            } else {
                return Utils.getResponseEntity(constants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
        }
        return Utils.getResponseEntity(constants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    //    ----validate the signup values
    private boolean validateSignUp(Map<String, String> requestMap) {
        return requestMap.containsKey("name") &&
                requestMap.containsKey("city") &&
                requestMap.containsKey("email") &&
                requestMap.containsKey("password");
    }

//---get user data from the map
    private User getUserFromMap(Map<String,String> requestMap){
        User user=new User();
        user.setName(requestMap.get("name"));
        user.setCity(requestMap.get("city"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        return user;
    }



    //    -----------service of login
    @Override
    public User login(Map<String, String> requestMap) {
        // Extract email and password from the map
        String email = requestMap.get("email");
        String password = requestMap.get("password");

        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password are required");
        }
        
        // Authenticate the user
        Optional<User> user = userDao.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get(); // Return the authenticated user
        }

        throw new IllegalArgumentException("Invalid email or password"); // Or a custom exception
    }



//
    //    -----------service of get all user
    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
//        log.info("Checking if user has admin privileges.");
//        log.info("Authentication context: {}", SecurityContextHolder.getContext().getAuthentication());

        try{
      //      if (jwtFilter.isAdmin()){
                List<UserWrapper> users=userDao.getAllUser();
                System.out.println(users);
              //  log.info("User role: {}", jwtFilter.isAdmin() ? "admin" : "not admin");
                return new ResponseEntity<>(users,HttpStatus.OK);
//            }
//            else{
//                return new ResponseEntity<>(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
//            }
        }catch (Exception ex){
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
        }
        return  new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
// //////////////////////
    @Override
    public ResponseEntity<String> makeBloodAppeal(Map<String, String> requestMap) {
        try {
            // Extracting values from requestMap
        	String temp = jwtUtils.extractEmail(customerUserDetailsService.staticToken);
        	int userId = userDao.getIdByEmail(temp);
        	
           // int userId = Integer.parseInt(requestMap.get("userId"));
            //int bloodGroupId = Integer.parseInt(requestMap.get("bloodGroupId"));
        	String temp1 = requestMap.get("bloodGroup");
            int bloodGroupId = bloodGroupRepository.getIdByBloodGroup(temp1);
            String location = requestMap.get("location");
            int quantity = Integer.parseInt(requestMap.get("quantity"));
            String description = requestMap.get("description");  // New description field

            // Fetching User and BloodGroup from the database
            Optional<User> user = userDao.findById(userId);
            Optional<BloodGroup> bloodGroup = bloodGroupRepository.findById(bloodGroupId);

            if (user.isPresent() && bloodGroup.isPresent()) {
                // Creating a new BloodAppeal object
                BloodAppeal appeal = new BloodAppeal();
                appeal.setUser(user.get());
                appeal.setBloodGroup(bloodGroup.get());
                appeal.setLocation(location);
                appeal.setQuantity(quantity);
                appeal.setDescription(description);  // Setting description
                appeal.setStatus(Status.PENDING);  // Default status

                // Saving the appeal to the database
                bloodAppealRepository.save(appeal);

                // Returning success response
                return new ResponseEntity<>("Blood appeal request created successfully", HttpStatus.OK);
            } else {
                // Handling case where user or blood group is invalid
                return new ResponseEntity<>("Invalid user or blood group ID", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            Log.logError("An error occurred while processing the request.", e);
            // Printing stack trace for debugging
            e.printStackTrace();
            
            // Returning error response in case of exception
            return new ResponseEntity<>("Error creating blood appeal", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//  -----------service to make donation request
    
    @Override
    public ResponseEntity<String> createDonationRequest(Map<String, String> requestMap) {
        try {
            // Extracting values from requestMap
        	String temp = jwtUtils.extractEmail(customerUserDetailsService.staticToken);
        	int userId = userDao.getIdByEmail(temp);
        	
           // int userId = Integer.parseInt(requestMap.get("userId"));
        	String temp1 = requestMap.get("bloodGroup");
            int bloodGroupId = bloodGroupRepository.getIdByBloodGroup(temp1);
            String location = requestMap.get("location");
            int quantity = Integer.parseInt(requestMap.get("quantity"));

            // Fetching User and BloodGroup from the database
            Optional<User> user = userDao.findById(userId);
            Optional<BloodGroup> bloodGroup = bloodGroupRepository.findById(bloodGroupId);

            if (user.isPresent() && bloodGroup.isPresent()) {
                // Creating a new BloodAppeal object
                DonationRequest appeal = new DonationRequest();
                appeal.setUser(user.get());
                appeal.setBloodGroup(bloodGroup.get());
                appeal.setLocation(location);
                appeal.setQuantity(quantity);
                 // Default status

                // Saving the appeal to the database
                donationRequestRepository.save(appeal);

                // Returning success response
                return new ResponseEntity<>("Blood donation request created successfully", HttpStatus.OK);
            } else {
                // Handling case where user or blood group is invalid
                return new ResponseEntity<>("Invalid user or blood group ID", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            Log.logError("An error occurred while processing the request.", e);
            // Printing stack trace for debugging
            e.printStackTrace();
            
            // Returning error response in case of exception
            return new ResponseEntity<>("Error creating blood donation request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

          
  
}
