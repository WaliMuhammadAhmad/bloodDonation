package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.BloodGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BloodGroupRepository extends JpaRepository<BloodGroup, Integer> {
    Optional<BloodGroup> findByBloodGroup(String bloodGroup);
    @Query("SELECT b.bloodGroupID FROM BloodGroup b WHERE b.bloodGroup = :bloodGroup")
    Integer getIdByBloodGroup(@Param("bloodGroup") String bloodGroup);
}
