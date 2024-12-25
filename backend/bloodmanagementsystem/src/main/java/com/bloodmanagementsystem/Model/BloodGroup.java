package com.bloodmanagementsystem.Model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "BloodGroup")
public class BloodGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bloodGroupID;

    @Column(unique = true, nullable = false, length = 3)
    private String bloodGroup;

    // Getters and Setters
    public int getBloodGroupID() {
        return bloodGroupID;
    }

    public void setBloodGroupID(int bloodGroupID) {
        this.bloodGroupID = bloodGroupID;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
}

