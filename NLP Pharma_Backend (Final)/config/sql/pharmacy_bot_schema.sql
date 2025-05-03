DROP DATABASE IF EXISTS pharmacy_bot;

-- Create a new database
CREATE DATABASE pharmacy_bot;
USE pharmacy_bot;

-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS medicines;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS feedback;

-- Table to store user details
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store medicine details
CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store order details
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    medicine_id INT,
    quantity INT,
    delivery_location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

-- Table to store customer feedback
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
