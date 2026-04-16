require('dotenv').config();
const pool = require('./config/database');

// Sample book data
const sampleBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    notes: "An excellent book about building good habits and breaking bad ones. The concept of 1% improvement every day is powerful.",
    date_read: "2024-01-15",
    cover_id: "OL27471406M"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4,
    notes: "Focuses on the importance of deep, concentrated work in an age of constant distraction.",
    date_read: "2024-02-20",
    cover_id: "OL25687735M"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 5,
    notes: "Timeless lessons on wealth, greed, and happiness. Great insights on behavioral finance.",
    date_read: "2024-03-10",
    cover_id: "OL28689428M"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    rating: 4,
    notes: "Explores the two systems that drive the way we think - System 1 (fast) and System 2 (slow).",
    date_read: "2024-03-25",
    cover_id: "OL24404459M"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 5,
    notes: "A brief history of humankind. Fascinating perspective on how Homo sapiens came to dominate the world.",
    date_read: "2024-04-05",
    cover_id: "OL25423646M"
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    rating: 4,
    notes: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    date_read: "2024-04-12",
    cover_id: "OL26946326M"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    rating: 5,
    notes: "Notes on startups, or how to build the future. Contrarian thinking about innovation and progress.",
    date_read: "2024-04-18",
    cover_id: "OL28160430M"
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    rating: 4,
    notes: "Essential reading for anyone interested in design and user experience.",
    date_read: "2024-04-25",
    cover_id: "OL22993328M"
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Clear existing books
    await pool.query('DELETE FROM books');
    console.log('✅ Cleared existing books');
    
    // Insert sample books
    for (const book of sampleBooks) {
      const query = `
        INSERT INTO books (title, author, rating, notes, date_read, cover_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        book.title,
        book.author,
        book.rating,
        book.notes,
        book.date_read,
        book.cover_id
      ];
      
      await pool.query(query, values);
      console.log(`✅ Added: "${book.title}" by ${book.author}`);
    }
    
    console.log('🎉 Database seeded successfully!');
    console.log(`📚 Total books: ${sampleBooks.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
