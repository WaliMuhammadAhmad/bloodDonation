package com.bloodmanagementsystem.Config;

import com.bloodmanagementsystem.Model.Admin;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.DAO.AdminDao;
import com.bloodmanagementsystem.DAO.UserDao;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;



@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final UserDao userRepository;
    private final AdminDao adminRepository;

    public CustomerUserDetailsService(UserDao userRepository, AdminDao admin) {
        this.userRepository = userRepository;
        this.adminRepository= admin;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailId(email);
        Admin admin = adminRepository.findByEmailId(email);
        		 if (!Objects.isNull(user)) {
        			 return new org.springframework.security.core.userdetails.User(
        		                user.getEmail(),
        		                user.getPassword(),
        		                new ArrayList<>()
        		        );
        		 } else if (!Objects.isNull(admin)) {
            			 return new org.springframework.security.core.userdetails.User(
            		                admin.getEmail(),
            		                admin.getPassword(),
            		                new ArrayList<>()
            		        );
            		 }
        		 else
        		 
        		 {
        	            throw new UsernameNotFoundException("User not found with email: " + email);
        	        }
        	    }        
        
    }


