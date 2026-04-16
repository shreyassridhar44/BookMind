# 📚 BookMind

A production-quality personal book tracking and insights platform inspired by Derek Sivers' book notes website. Built with modern web technologies and featuring a premium SaaS-like design.

![BookMind](https://img.shields.io/badge/BookMind-v1.0.0-indigo) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange)

## ✨ Features

- **📖 Book Tracking**: Add, edit, and delete books with personal notes, ratings, and read dates
- **🎨 Modern UI/UX**: Premium SaaS-inspired design with smooth animations and transitions
- **🔍 Search & Filter**: Real-time search by title, author, or notes; sort by rating, date, or title
- **📊 Analytics Dashboard**: View reading statistics including total books, average rating, top author, and monthly progress
- **🖼️ Book Covers**: Automatic cover images via Open Library Covers API
- **⭐ Star Ratings**: Visual 5-star rating system
- **📝 Notes & Summaries**: Add detailed notes and book summaries
- **🎯 Modal Interface**: Smooth modal popups for adding/editing books
- **💡 Flash Messages**: Success/error notifications for user feedback
- **📱 Responsive Design**: Fully responsive across desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js

### Frontend
- **EJS** - Templating engine
- **HTML5/CSS3** - Markup and styling
- **Vanilla JavaScript** - Client-side interactivity

### API Integration
- **Open Library Covers API** - Book cover images
- **Axios** - HTTP client (included in dependencies for future use)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **npm** (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd BookMind-WS
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- ejs
- mysql2
- axios
- express-session
- connect-flash
- dotenv
- nodemon (dev dependency)

### 3. Configure Environment Variables

Open the `.env` file in the project root and update the database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bookmind
DB_USER=root
DB_PASSWORD=your_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important**: Replace `your_password` with your actual MySQL password.

### 4. Create MySQL Database

Open your MySQL command line tool (mysql) or a GUI tool like MySQL Workbench and run:

```sql
-- Create the database
CREATE DATABASE bookmind;

-- Exit mysql
exit;
```

Or using the command line:

```bash
mysql -u root -p -e "CREATE DATABASE bookmind;"
```

### 5. Run Database Schema

Apply the database schema to create the books table:

```bash
mysql -u root -p bookmind < config/schema.sql
```

Or manually run the SQL commands in `config/schema.sql` using MySQL Workbench or your preferred MySQL client.

### 6. (Optional) Seed Sample Data

Populate the database with sample books for testing:

```bash
node seedData.js
```

This will add 8 sample books with cover images and notes.

### 7. Start the Development Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 8. Access the Application

Open your browser and navigate to:

- **Dashboard**: http://localhost:3000
- **Analytics**: http://localhost:3000/analytics

## 📁 Project Structure

```
BookMind-WS/
├── config/
│   ├── database.js      # MySQL connection pool
│   └── schema.sql       # Database schema definition
├── controllers/
│   └── bookController.js # Business logic for book operations
├── models/
│   └── Book.js          # Book model with CRUD operations
├── public/
│   ├── css/
│   │   └── styles.css   # Modern CSS with animations
│   └── js/
│       └── main.js      # Client-side JavaScript
├── routes/
│   └── bookRoutes.js    # API route definitions
├── views/
│   ├── layout.ejs       # Main layout template
│   ├── dashboard.ejs    # Dashboard page
│   ├── analytics.ejs    # Analytics page
│   └── error.ejs        # Error page
├── .env                 # Environment variables
├── index.js             # Main server file
├── package.json         # Dependencies and scripts
├── seedData.js          # Sample data seeding script
└── README.md            # This file
```

## 🎯 Usage Guide

### Adding a Book

1. Click the **"Add Book"** button in the top navbar
2. Fill in the required fields (Title and Author)
3. Optionally add:
   - Rating (1-5 stars)
   - Date Read
   - Open Library Cover ID (find at openlibrary.org)
   - Notes and summary
4. Click **"Add Book"** to save

### Finding Cover IDs

To add book covers from Open Library:

1. Visit [openlibrary.org](https://openlibrary.org)
2. Search for your book
3. Copy the Cover ID from the URL (e.g., `OL123456M`)
4. Paste it in the "Open Library Cover ID" field

### Editing a Book

1. Click the **edit icon** (pencil) on any book card
2. Modify the fields as needed
3. Click **"Update Book"** to save changes

### Deleting a Book

1. Click the **delete icon** (trash) on any book card
2. Confirm the deletion in the popup

### Searching Books

1. Use the search bar in the filter section
2. Type to search by title, author, or notes
3. Results update in real-time

### Sorting Books

Use the dropdown to sort by:
- Newest First
- Oldest First
- Highest Rated
- Lowest Rated
- Title A-Z
- Title Z-A

### Viewing Analytics

Navigate to the **Analytics** page to see:
- Total books read
- Average rating
- Most read author
- Books read this month
- Recent reading activity
- Rating distribution

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render dashboard with all books |
| GET | `/analytics` | Render analytics page |
| POST | `/books` | Create a new book |
| GET | `/books/:id` | Get a single book by ID |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/search?q=query` | Search books |

## 🗄 Database Schema

### Books Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary key |
| title | VARCHAR(255) | Book title (required) |
| author | VARCHAR(255) | Author name (required) |
| rating | INTEGER | Rating 1-5 |
| notes | TEXT | Personal notes and summary |
| date_read | DATE | When the book was read |
| cover_id | VARCHAR(255) | Open Library cover ID |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 🎨 Design Features

- **Modern Typography**: Inter font family for clean, professional look
- **Color Palette**: Indigo primary with carefully selected accent colors
- **Soft Shadows**: Multi-layered shadows for depth
- **Rounded Corners**: Consistent border-radius for smooth UI
- **Smooth Animations**: CSS transitions for all interactive elements
- **Responsive Grid**: Adaptive card layout for all screen sizes
- **Hover Effects**: Subtle lift and shadow on hover
- **Loading States**: Visual feedback during operations
- **Flash Messages**: Animated success/error notifications

## 🐛 Troubleshooting

### Database Connection Error

If you see "Error connecting to MySQL database":
- Verify MySQL is running
- Check your `.env` credentials
- Ensure the database `bookmind` exists

### Port Already in Use

If port 3000 is already in use:
- Change the PORT in `.env` file
- Or stop the process using port 3000

### Cover Images Not Loading

- Verify the cover_id is correct
- Check your internet connection
- The app uses a fallback placeholder if covers fail

## 📝 Development Notes

- The application follows MVC architecture pattern
- All database queries use parameterized statements to prevent SQL injection
- Error handling is implemented at controller and server level
- The app is designed to be extended with features like:
  - User authentication
  - Book categories/tags
  - Export to CSV/PDF
  - Dark mode toggle
  - Social sharing

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Book categories and tags
- [ ] Reading goals and progress tracking
- [ ] Export to CSV/PDF
- [ ] Dark mode toggle
- [ ] Social sharing features
- [ ] Book recommendations
- [ ] Reading streak tracking
- [ ] Quote/highlight management

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📧 Support

For questions or support, please open an issue in the project repository.

---

**Built with ❤️ using Node.js, Express, MySQL, and modern web technologies**
