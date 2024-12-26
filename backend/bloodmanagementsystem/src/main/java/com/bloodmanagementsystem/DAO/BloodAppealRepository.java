package com.bloodmanagementsystem.DAO;
import com.bloodmanagementsystem.Model.BloodAppeal;
import com.bloodmanagementsystem.Model.BloodGroup;
import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.wrapper.UserWrapper;

import ch.qos.logback.core.status.Status;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodAppealRepository extends JpaRepository<BloodAppeal, Integer> {
    List<BloodAppeal> findByStatus(com.bloodmanagementsystem.Model.Status status);
}
