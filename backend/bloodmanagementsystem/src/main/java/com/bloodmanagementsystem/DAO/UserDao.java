package com.bloodmanagementsystem.DAO;

import com.bloodmanagementsystem.Model.User;
import com.bloodmanagementsystem.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//---Data access Object or Repository for the User data
@Repository
public interface UserDao extends JpaRepository<User,Integer> {

// abstract query function to find user by email
    User findByEmailId(@Param("email") String email);
    Optional<User> findByEmail(String email);


//   //abstract query function to get all user
    List<UserWrapper> getAllUser();
    @Query("SELECT u.id FROM User u WHERE u.email = :email")
    Integer getIdByEmail(@Param("email") String email);

    // abstract query function to get all admin
//    List<String> getAllAdmin();

//    // abstract query function to update the user status
//    @Transactional
//    @Modifying
//    void updateStatus(@Param("status") String status,@Param("id") Integer id);
//
//    // abstract query function to get the user by mail
//    User findByEmail(String email);

}
