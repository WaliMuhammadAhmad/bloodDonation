package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.BloodInventory;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.wrapper.UserWrapper;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Integer> {
	@Query("SELECT b FROM BloodInventory b WHERE LOWER(b.city) = LOWER(:city) AND b.bloodGroup = :bloodGroup")
	Optional<BloodInventory> findByBloodGroupAndCity(@Param("bloodGroup") BloodGroup bloodGroup, @Param("city") String city);
    List<BloodInventory> findByCity(String city);
    
}