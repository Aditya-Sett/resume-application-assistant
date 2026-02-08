CREATE DATABASE resume_assistant;
USE resume_assistant;

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50), -- 'objective', 'skills', or 'projects'
    raw_input TEXT,
    processed_output TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);