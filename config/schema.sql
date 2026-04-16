-- BookMind Database Schema
-- MySQL Schema for Simple Book Tracking Application

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INT NULL,
  notes TEXT,
  date_read DATE,
  cover_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_rating CHECK (rating >= 1 AND rating <= 5 OR rating IS NULL)
);

-- Create indexes for books
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_date_read ON books(date_read DESC);
CREATE INDEX idx_books_rating ON books(rating DESC);
