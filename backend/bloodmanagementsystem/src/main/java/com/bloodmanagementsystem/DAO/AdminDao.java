package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.Admin;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.wrapper.AdminWrapper;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminDao extends JpaRepository<Admin,Integer> {
	// abstract query function to find user by email
    Admin findByEmailId(@Param("email") String email);


//   //abstract query function to get all user
    List<AdminWrapper> getAllAdmin();
}
