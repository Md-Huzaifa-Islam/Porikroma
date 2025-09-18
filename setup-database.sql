-- Travel App Database Setup
-- Create database
CREATE DATABASE IF NOT EXISTS travel_app_db;
USE travel_app_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
    destination_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
    trip_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create trip_users junction table
CREATE TABLE IF NOT EXISTS trip_users (
    trip_user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role ENUM('organizer', 'participant') DEFAULT 'participant',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_trip_user (trip_id, user_id)
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
    expense_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
    accommodation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    amenities TEXT,
    contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transportation table
CREATE TABLE IF NOT EXISTS transportation (
    transportation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    departure_location VARCHAR(255) NOT NULL,
    arrival_location VARCHAR(255) NOT NULL,
    departure_time TIME,
    arrival_time TIME,
    price DECIMAL(10,2) NOT NULL,
    capacity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create local_services table
CREATE TABLE IF NOT EXISTS local_services (
    service_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    booking_type ENUM('accommodation', 'transportation', 'service') NOT NULL,
    reference_id BIGINT NOT NULL,
    booking_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    message_type ENUM('text', 'image', 'file') DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    rating_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    trip_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE
);

-- Create user_ratings table
CREATE TABLE IF NOT EXISTS user_ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rater_id BIGINT NOT NULL,
    rated_user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rater_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (rated_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create trip_transportation_expenses table
CREATE TABLE IF NOT EXISTS trip_transportation_expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id BIGINT NOT NULL,
    transportation_id BIGINT NOT NULL,
    expense_amount DECIMAL(10,2) NOT NULL,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (transportation_id) REFERENCES transportation(transportation_id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO destinations (name, location, description) VALUES
('Cox''s Bazar', 'Chittagong, Bangladesh', 'World''s longest natural sea beach'),
('Sylhet', 'Sylhet Division, Bangladesh', 'Tea gardens and natural beauty'),
('Sajek Valley', 'Rangamati, Bangladesh', 'Queen of hills with cloud touching experience'),
('Sundarban', 'Khulna, Bangladesh', 'World''s largest mangrove forest'),
('Saint Martin', 'Cox''s Bazar, Bangladesh', 'Only coral island of Bangladesh'),
('Bandarban', 'Chittagong Division, Bangladesh', 'Hill district with tribal culture');

INSERT INTO accommodations (name, location, price_per_night, rating, contact) VALUES
('Hotel Sea Crown', 'Cox''s Bazar', 4500.00, 4.5, '+880-1711-123456'),
('Sylhet Grand Hotel', 'Sylhet', 3500.00, 4.2, '+880-1712-234567'),
('Sajek Resort', 'Sajek Valley', 2500.00, 4.0, '+880-1713-345678'),
('Sundarban Eco Resort', 'Sundarban', 3000.00, 4.3, '+880-1714-456789'),
('Saint Martin Beach Resort', 'Saint Martin', 5000.00, 4.7, '+880-1715-567890');

INSERT INTO transportation (type, departure_location, arrival_location, departure_time, arrival_time, price, capacity) VALUES
('Bus', 'Dhaka', 'Cox''s Bazar', '08:00:00', '14:00:00', 800.00, 40),
('Train', 'Dhaka', 'Sylhet', '06:30:00', '12:00:00', 600.00, 200),
('Bus', 'Chittagong', 'Bandarban', '07:00:00', '10:00:00', 300.00, 30),
('Flight', 'Dhaka', 'Cox''s Bazar', '09:00:00', '10:00:00', 8500.00, 150),
('Bus', 'Dhaka', 'Rangamati', '09:00:00', '15:00:00', 650.00, 35);

INSERT INTO local_services (name, type, contact, location) VALUES
('Cox''s Bazar Guide Services', 'Tour Guide', '+880-1234567890', 'Cox''s Bazar'),
('Sylhet Tea Tours', 'Tour Guide', '+880-1234567891', 'Sylhet'),
('Sajek Adventure Guide', 'Adventure Guide', '+880-1234567892', 'Sajek Valley'),
('Sundarban Wildlife Tours', 'Wildlife Guide', '+880-1234567893', 'Sundarban'),
('Saint Martin Diving Center', 'Water Sports', '+880-1234567894', 'Saint Martin');

-- Show created tables
SHOW TABLES;

-- Show sample data
SELECT 'Destinations:' as Info;
SELECT * FROM destinations LIMIT 3;

SELECT 'Accommodations:' as Info;
SELECT * FROM accommodations LIMIT 3;

SELECT 'Transportation:' as Info;
SELECT * FROM transportation LIMIT 3;

SELECT 'Local Services:' as Info;
SELECT * FROM local_services LIMIT 3;