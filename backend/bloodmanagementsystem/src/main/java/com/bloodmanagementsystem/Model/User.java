package com.bloodmanagementsystem.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;



//@Data
// query to find user by email
@NamedQuery(name = "User.findByEmailId", query = "SELECT u FROM User u WHERE u.email = :email")
 //query to get all users
@NamedQuery(name = "User.getAllUser", query = "SELECT new com.bloodmanagementsystem.wrapper.UserWrapper(u.id, u.name, u.email, u.city, u.password) FROM User u ")

// // query to update status
//@NamedQuery(name = "User.updateStatus", query = "update User u set u.status =:status  WHERE u.id = :id")
//
// //query to get all users
//@NamedQuery(name = "User.getAllAdmin", query = "SELECT u.email  FROM User u WHERE u.role = 'admin'")


@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "user")
public class User implements Serializable {



    // Default Constructor
    public User() {
    }

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

//    @Column(name = "contactNumber")
//    private String contactNumber;
//    
    @Column(name = "email")
    private String email;

    @Column(name = "city")
    private String city;
    
    @Column(name = "password")
    private String password;
    
    @Column(nullable = true)
    private LocalDate lastDonationDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
   
    
    public LocalDate getLastDonationDate() {
        return lastDonationDate;
    }

    public void setLastDonationDate(LocalDate ldate) {
        this.lastDonationDate = ldate;
    }
//
//    @Column(name = "status")
//    private String status;
//
//
//    @Column(name = "role")
//    private String role;
//


    // Getter and Setter for id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    // Getter and Setter for contactNumber
//    public String getContactNumber() {
//        return contactNumber;
//    }
//
//    public void setContactNumber(String contactNumber) {
//        this.contactNumber = contactNumber;
//    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    
    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    // Getter and Setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    // Getter and Setter for status
//    public String getStatus() {
//        return status;
//    }



//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getRole() {
//        return role;
//    }

}
