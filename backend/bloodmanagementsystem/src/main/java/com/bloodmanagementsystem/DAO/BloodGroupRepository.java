package com.bloodmanagementsystem.DAO;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodGroupRepository extends JpaRepository<BloodGroup, Integer> {
	
}
