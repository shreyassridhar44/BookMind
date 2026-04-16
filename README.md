# 📚 BookMind

> BookMind is a premium, full-stack personal book tracking platform. Built with Node.js, Express, and MySQL, it features a visually stunning, SaaS-style interactive dashboard to catalog reading history, add notes, fetch dynamic covers via the Open Library API, and analyze reading statistics in real-time.

![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange) ![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)

## ✨ Core Features
* **Interactive Dashboard:** Premium SaaS-inspired UI with smooth animations, modal interfaces, and flash messaging.
* **Dynamic Media:** Automatic book cover fetching via the Open Library Covers API (supports OLID and ISBN).
* **Reading Analytics:** Real-time calculation of total books, average ratings, top authors, and monthly reading velocity.
* **Advanced Data Handling:** Debounced client-side search combined with multi-parameter database sorting.

## 🛠 Tech Stack
* **Frontend:** EJS, Vanilla JavaScript (ES6+), Custom HTML5/CSS3
* **Backend:** Node.js, Express.js (MVC Architecture)
* **Database:** MySQL, `mysql2` driver

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18 or higher)
* **MySQL** (v8.0 or higher)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/Shreyas5832/BookMind-WS.git](https://github.com/Shreyas5832/BookMind-WS.git)
cd BookMind-WS
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root and add your database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bookmind
DB_USER=root
DB_PASSWORD=your_mysql_password

# Server Configuration
PORT=3000
```

### 3. Database Setup
Log into your local MySQL instance:
```bash
mysql -u root -p
```
Create the database:
```sql
CREATE DATABASE bookmind;
exit;
```

### 4. Apply Schema & Seed Data
Run the schema file to build the tables, then optionally seed it with sample data:
```bash
mysql -u root -p bookmind < config/schema.sql
node seedData.js
```

### 5. Start the Server
```bash
# Standard start
npm start

# Development mode (auto-reloads)
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

---

## 🗄️ Database Schema (`books`)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PK, AUTO_INCREMENT | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Book title |
| `author` | VARCHAR(255) | NOT NULL | Author name |
| `rating` | INTEGER | | 1-5 star rating |
| `notes` | TEXT | | Personal summaries |
| `date_read`| DATE | | Completion date |
| `cover_id` | VARCHAR(255) | | Open Library ID or ISBN |

---

## 🔧 API Reference

| Method | Endpoint | Action |
|--------|----------|-------------|
| `GET` | `/` | Render dashboard |
| `GET` | `/analytics` | Render statistics |
| `POST` | `/books` | Create new entry |
| `GET` | `/books/:id` | Fetch specific entry |
| `PUT` | `/books/:id` | Update entry |
| `DELETE` | `/books/:id` | Delete entry |
| `GET` | `/search?q=` | Query database |

---

## 📁 Architecture
```text
BookMind/
├── config/          # Database connection & schema
├── controllers/     # Route logic & database interactions
├── models/          # MySQL queries & data formatting
├── public/          # Static assets (CSS, Client-side JS)
├── routes/          # Express route definitions
├── views/           # EJS templates & layouts
└── index.js         # Entry point & server configuration
```

---
**Author:** Shreyas Sridhar | [GitHub](https://github.com/Shreyas5832) | shreyassridhar44@gmail.com
