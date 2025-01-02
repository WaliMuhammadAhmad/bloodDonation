package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.BloodAppeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodAppealRepository extends JpaRepository<BloodAppeal, Integer> {
    List<BloodAppeal> findByStatus(com.bloodmanagementsystem.Model.Status status);
    @Query("SELECT COUNT(b) FROM BloodAppeal b WHERE b.status = :status")
    long countByStatus(com.bloodmanagementsystem.Model.Status status);
}
