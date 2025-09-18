-- Simplified Travel App Database Schema
-- Keep only essential tables that are actually being used

USE travel_app_db;

-- Drop all unnecessary tables
DROP TABLE IF EXISTS user_ratings;
DROP TABLE IF EXISTS trip_transportation_expenses;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS bookings;

-- Keep these core tables:
-- users (✅ actively used)
-- trips (✅ actively used)
-- trip_users (✅ actively used)
-- destinations (🔶 has backend support)
-- transportation (🔶 has backend support)
-- accommodations (🔶 has backend support)
-- expenses (🔶 has backend support)
-- local_services (🔶 has backend support)

-- Verify what remains
SHOW TABLES;

-- Show table row counts
SELECT 'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'trips', COUNT(*) FROM trips
UNION ALL
SELECT 'trip_users', COUNT(*) FROM trip_users
UNION ALL
SELECT 'destinations', COUNT(*) FROM destinations
UNION ALL
SELECT 'transportation', COUNT(*) FROM transportation
UNION ALL
SELECT 'accommodations', COUNT(*) FROM accommodations
UNION ALL
SELECT 'expenses', COUNT(*) FROM expenses
UNION ALL
SELECT 'local_services', COUNT(*) FROM local_services;