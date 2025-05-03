-- Step 1: Create the Database
CREATE DATABASE IF NOT EXISTS pharmacy_bot;

-- Step 2: Use the Database
USE pharmacy_bot;

-- Step 3: Create Table: Orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create Table: Feedback
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating VARCHAR(10),        -- rating will be number 1-5 or text comment
    comment TEXT,              -- suggestion/comment text
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
