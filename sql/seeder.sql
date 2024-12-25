USE bloodmanagementsystem;

INSERT INTO Admin (adminid,name, email, password, createdAt, updatedAt)
VALUES 
(1,'Admin', 'admin', 'admin', NOW(), NOW());
-- -------------------------------------------------

-- -------------------------------------------------
INSERT INTO user (name, email, city, password, lastDonationDate, createdAt, updatedAt) 
VALUES 
('Muhammad Noman', 'noman@example.com', 'Lahore', '1234', '2024-12-01', '2024-12-24 12:00:00', '2024-12-24 12:00:00'),
('Ayesha Khan', 'ayesha@example.com', 'Karachi', 'strongPass456', NULL, '2024-12-24 12:05:00', '2024-12-24 12:05:00'),
('Ali Raza', 'ali@example.com', 'Islamabad', 'pass789', '2024-11-20', '2024-12-24 12:10:00', '2024-12-24 12:10:00');
-- BloodGroups Must
INSERT INTO BloodGroup (bloodGroup) 
VALUES ('A+'), 
       ('A-'), 
       ('B+'), 
       ('B-'), 
       ('AB+'), 
       ('AB-'), 
       ('O+'), 
       ('O-');
-- Blood Inventory
INSERT INTO BloodInventory (BloodGroupID, city, quantity, createdAt, updatedAt)
VALUES 
(1, 'Lahore', 50, NOW(), NOW()),  -- Assuming BloodGroupID 1 corresponds to 'A+'
(2, 'Karachi', 30, NOW(), NOW()), -- Assuming BloodGroupID 2 corresponds to 'A-'
(3, 'Islamabad', 45, NOW(), NOW()), -- Assuming BloodGroupID 3 corresponds to 'B+'
(4, 'Multan', 60, NOW(), NOW()), -- Assuming BloodGroupID 4 corresponds to 'B-'
(5, 'Peshawar', 40, NOW(), NOW()), -- Assuming BloodGroupID 5 corresponds to 'AB+'
(6, 'Lahore', 70, NOW(), NOW()); -- Assuming BloodGroupID 6 corresponds to 'AB-'


INSERT INTO BloodDonationRequest (UserID, AdminID, BloodGroupID, location, quantity, status, createdAt, updatedAt, adminRemarks)
VALUES 
(1, 1, 1, 'Lahore', 5, 'PENDING', NOW(), NOW(), NULL),  -- UserID 1 (Muhammad Noman), BloodGroup 'A+', Location 'Lahore', Quantity 5, AdminID is always 1
(2, 1, 2, 'Karachi', 10, 'PENDING', NOW(), NOW(), NULL),  -- UserID 2, BloodGroup 'A-', Location 'Karachi', Quantity 10, AdminID is always 1
(3, 1, 3, 'Islamabad', 8, 'PENDING', NOW(), NOW(), NULL), -- UserID 3, BloodGroup 'B+', Location 'Islamabad', Quantity 8, AdminID is always 1
(3, 1, 4, 'Multan', 12, 'PENDING', NOW(), NOW(), NULL),  -- UserID 4, BloodGroup 'B-', Location 'Multan', Quantity 12, AdminID is always 1
(2, 1, 5, 'Peshawar', 6, 'PENDING', NOW(), NOW(), NULL),  -- UserID 5, BloodGroup 'AB+', Location 'Peshawar', Quantity 6, AdminID is always 1
(1, 1, 6, 'Lahore', 15, 'PENDING', NOW(), NOW(), NULL);  -- UserID 6, BloodGroup 'AB-', Location 'Lahore', Quantity 15, AdminID is always 1

-- Inserting Blood Appeals where AdminID is always 1
INSERT INTO BloodAppeal (UserID, AdminID, BloodGroupID, location, quantity, status, remarks, description, createdAt, updatedAt)
VALUES 
(1, 1, 1, 'Karachi', 3, 'PENDING', 'Blood required for emergency surgery', 'Urgent requirement for accident victims', NOW(), NOW());

INSERT INTO BloodAppeal (UserID, AdminID, BloodGroupID, location, quantity, status, remarks, description, createdAt, updatedAt)
VALUES 
(2, 1, 2, 'Lahore', 2, 'PENDING', 'Request for blood donation drive', 'Required for a blood donation camp', NOW(), NOW());

INSERT INTO BloodAppeal (UserID, AdminID, BloodGroupID, location, quantity, status, remarks, description, createdAt, updatedAt)
VALUES 
(3, 1, 3, 'Islamabad', 5, 'PENDING', 'Urgent need for surgery', 'Blood required for heart surgery', NOW(), NOW());

INSERT INTO BloodAppeal (UserID, AdminID, BloodGroupID, location, quantity, status, remarks, description, createdAt, updatedAt)
VALUES 
(3, 1, 4, 'Karachi', 4, 'PENDING', 'Blood required for cancer treatment', 'Required for chemotherapy treatment', NOW(), NOW());
