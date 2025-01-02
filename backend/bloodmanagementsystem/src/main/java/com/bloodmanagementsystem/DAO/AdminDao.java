package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.Admin;
import com.bloodmanagementsystem.wrapper.AdminWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminDao extends JpaRepository<Admin,Integer> {
	// abstract query function to find user by email
    Admin findByEmailId(@Param("email") String email);
    Optional<Admin> findByEmail(String email);


//   //abstract query function to get all user
    List<AdminWrapper> getAllAdmin();
}
