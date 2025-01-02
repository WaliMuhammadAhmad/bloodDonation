package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.DonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, Integer> {
   // List<DonationRequest> findByUserUserID(int userID); // Custom query to get requests by user
    List<DonationRequest> findByStatus(com.bloodmanagementsystem.Model.Status status);
    
    @Query("SELECT COUNT(d) FROM DonationRequest d WHERE d.status = :status")
    long countByStatus(com.bloodmanagementsystem.Model.Status status);
}
