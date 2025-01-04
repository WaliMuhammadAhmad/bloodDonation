package com.bloodmanagementsystem.restimple;

import com.bloodmanagementsystem.Config.CustomerUserDetailsService;
import com.bloodmanagementsystem.Config.JwtUtils;
import com.bloodmanagementsystem.Config.Log;
import com.bloodmanagementsystem.Model.DonationRequest;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.constants.constants;
import com.bloodmanagementsystem.rest.UserRest;
import com.bloodmanagementsystem.service.UserService;
import com.bloodmanagementsystem.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


// Category user class which implements UserRest api interface
@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    //    -------Api implementation for sign up
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try {
        	Log.logApiRequest("POST", "/user/signup");
            return userService.signUp(requestMap);
        } catch (Exception ex) {
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
        }
        return Utils.getResponseEntity(constants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    //---------Api implementation for login
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
        	Log.logApiRequest("POST", "/user/login");
        	 // Extract email and password from the request body
            String email = requestMap.get("email");
            String password = requestMap.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            // Authenticate the user
            User authenticatedUser = userService.login(requestMap);
            if (authenticatedUser != null) {
                // Generate JWT token
                String token = jwtUtils.generateToken(email);
                customerUserDetailsService.staticToken=token;
                // Prepare JSON response
                String jsonResponse = String.format("{\"token\": \"%s\", \"user\": %s}", token, authenticatedUser);
                //String jsonResponse = String.format(token);

                // Return token and user details
                return ResponseEntity.ok(jsonResponse);
            }
            
            // If authentication fails
            return ResponseEntity.status(401).body("Invalid email or password");

        } catch (Exception ex) {
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
        }

        return Utils.getResponseEntity(constants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

//    @PersistenceContext
//    private EntityManager entityManager;

//    //---------Api implementation for get all users
//    @Override
//    public ResponseEntity<List<UserWrapper>> getAllUser() {
//        try {
//            List<UserWrapper> userList = userService.getAllUser().getBody();
//            System.out.println("Controller Response: " + userList);
//            return new ResponseEntity<>(userList, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @Override
    public ResponseEntity<String> makeBloodAppeal( Map<String, String> requestMap) {
        try {
        	Log.logApiRequest("POST", "/user/bloodappeal");
            return userService.makeBloodAppeal(requestMap);
        } catch (Exception ex) {
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<String> requestDonation(Map<String, String> requestMap) {
    	try {
        	Log.logApiRequest("POST", "/user/donationrequest");
            return userService.createDonationRequest(requestMap);
        } catch (Exception ex) {
            Log.logError("An error occurred while processing the request.", ex);
            ex.printStackTrace();
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//
//    //---------Api implementation for Update Status
//    @Override
//    public ResponseEntity<String> update(Map<String, String> requestMap) {
//        try {
//            return userService.update(requestMap);
//
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return Utils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//
//    //    --------Api implementation to check token
//    @Override
//    public ResponseEntity<String> checkToken() {
//        try {
//            return userService.checkToken();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return Utils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
//
//    }
//
//
//    //    --------Api implementation change password
//    @Override
//    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
//        try {
//            return userService.changePassword(requestMap);
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return Utils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//
// //    --------Api implementation forgot password
//    @Override
//    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
//       try{
//
//           return userService.forgotPassword(requestMap);
//       }catch (Exception ex){
//           ex.printStackTrace();
//       }
//       return Utils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
