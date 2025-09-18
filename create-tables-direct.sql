-- Travel App Database Schema
-- Direct MySQL table creation (no Hibernate DDL)

USE travel_app_db;

-- Drop existing tables if they exist (in correct order to avoid foreign key constraints)
DROP TABLE IF EXISTS user_ratings;
DROP TABLE IF EXISTS trip_transportation_expenses;
DROP TABLE IF EXISTS trip_users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS local_services;
DROP TABLE IF EXISTS transportation;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Trips table
CREATE TABLE trips (
    trip_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Destinations table
CREATE TABLE destinations (
    destination_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Transportation table
CREATE TABLE transportation (
    transportation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Accommodations table
CREATE TABLE accommodations (
    hotel_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10,2),
    rating INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Local Services table
CREATE TABLE local_services (
    service_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Expenses table
CREATE TABLE expenses (
    expense_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ratings table
CREATE TABLE ratings (
    rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    review VARCHAR(1000),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Bookings table
CREATE TABLE bookings (
    booking_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    booking_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Messages table
CREATE TABLE messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Junction Tables for Many-to-Many relationships

-- Trip Users (Many-to-Many: Trip <-> User)
CREATE TABLE trip_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    trip_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(50) DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_trip_user (trip_id, user_id)
);

-- Trip Transportation Expenses (Trip expenses for transportation)
CREATE TABLE trip_transportation_expenses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    trip_id BIGINT NOT NULL,
    transportation_id BIGINT NOT NULL,
    expense_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (transportation_id) REFERENCES transportation(transportation_id) ON DELETE CASCADE,
    FOREIGN KEY (expense_id) REFERENCES expenses(expense_id) ON DELETE CASCADE
);

-- User Ratings (Users rating each other on trips)
CREATE TABLE user_ratings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    trip_id BIGINT NOT NULL,
    rater_id BIGINT NOT NULL,
    rated_id BIGINT NOT NULL,
    rating_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (rater_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (rated_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (rating_id) REFERENCES ratings(rating_id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_rating (rating_id)
);

-- Insert sample data for testing
INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', '$2a$10$dummyhashedpassword'),
('Jane Smith', 'jane@example.com', '$2a$10$dummyhashedpassword'),
('Bob Wilson', 'bob@example.com', '$2a$10$dummyhashedpassword');

INSERT INTO destinations (name, location, description) VALUES 
('Paris', 'France, Europe', 'City of Light with beautiful architecture and culture'),
('Tokyo', 'Japan, Asia', 'Modern metropolis with traditional culture'),
('New York', 'USA, North America', 'The city that never sleeps');

INSERT INTO transportation (type, provider, price, availability) VALUES 
('Flight', 'Airlines Inc', 299.99, TRUE),
('Train', 'Rail Express', 89.50, TRUE),
('Bus', 'City Bus Co', 45.00, TRUE),
('Taxi', 'Uber', 25.00, TRUE);

INSERT INTO trips (title, start_date, end_date, total_budget) VALUES 
('Weekend in Paris', '2024-06-15', '2024-06-17', 800.00),
('Tokyo Adventure', '2024-07-20', '2024-07-30', 2500.00),
('NYC Business Trip', '2024-08-05', '2024-08-08', 1200.00);

INSERT INTO trip_users (trip_id, user_id, role) VALUES 
(1, 1, 'ORGANIZER'),
(1, 2, 'MEMBER'),
(2, 1, 'MEMBER'),
(2, 3, 'ORGANIZER'),
(3, 2, 'ORGANIZER');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_trip_users_trip ON trip_users(trip_id);
CREATE INDEX idx_trip_users_user ON trip_users(user_id);

-- Show created tables
SHOW TABLES;

-- Show table structures
DESCRIBE users;
DESCRIBE trips;
DESCRIBE destinations;