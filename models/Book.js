const pool = require('../config/database');

class Book {
  // Get all books with optional sorting
  static async getAll(sortBy = 'date_read', order = 'DESC') {
    const validSortColumns = ['date_read', 'rating', 'title', 'created_at'];
    const validOrder = ['ASC', 'DESC'];
    
    const column = validSortColumns.includes(sortBy) ? sortBy : 'date_read';
    const sortDirection = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';
    
    const query = `
      SELECT * FROM books 
      ORDER BY ${column} ${sortDirection}
    `;
    
    const [result] = await pool.query(query);
    return result;
  }

  // Get book by ID
  static async getById(id) {
    const query = 'SELECT * FROM books WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result[0];
  }

  // Create a new book
  static async create(bookData) {
    const { title, author, rating, notes, date_read, cover_id, days_to_read } = bookData;
    
    const query = `
      INSERT INTO books (title, author, rating, notes, date_read, cover_id, days_to_read)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [title, author, rating, notes, date_read, cover_id, days_to_read || 1];
    const [result] = await pool.query(query, values);
    
    // Return the newly created book
    return await this.getById(result.insertId);
  }

  // Update an existing book
  static async update(id, bookData) {
    const { title, author, rating, notes, date_read, cover_id, days_to_read } = bookData;
    
    const query = `
      UPDATE books 
      SET title = ?, author = ?, rating = ?, notes = ?, date_read = ?, cover_id = ?, days_to_read = ?
      WHERE id = ?
    `;
    
    const values = [title, author, rating, notes, date_read, cover_id, days_to_read || 1, id];
    await pool.query(query, values);
    
    // Return the updated book
    return await this.getById(id);
  }

  // Delete a book
  static async delete(id) {
    // First get the book to return it
    const book = await this.getById(id);
    
    const query = 'DELETE FROM books WHERE id = ?';
    await pool.query(query, [id]);
    
    return book;
  }

  // Search books by title or author
  static async search(searchTerm) {
    const query = `
      SELECT * FROM books 
      WHERE LOWER(title) LIKE LOWER(?) 
         OR LOWER(author) LIKE LOWER(?) 
         OR LOWER(notes) LIKE LOWER(?)
      ORDER BY date_read DESC
    `;
    
    const searchTermPattern = `%${searchTerm}%`;
    const [result] = await pool.query(query, [searchTermPattern, searchTermPattern, searchTermPattern]);
    return result;
  }

  // Get statistics for analytics
  static async getStatistics() {
    const queries = [
      'SELECT COUNT(*) as total_books FROM books',
      'SELECT AVG(rating) as average_rating FROM books WHERE rating IS NOT NULL',
      'SELECT author, COUNT(*) as book_count FROM books GROUP BY author ORDER BY book_count DESC LIMIT 1',
      'SELECT COUNT(*) as books_this_month FROM books WHERE date_read >= DATE_FORMAT(NOW(), \'%Y-%m-01\')'
    ];

    const [totalResult] = await pool.query(queries[0]);
    const [avgRatingResult] = await pool.query(queries[1]);
    const [topAuthorResult] = await pool.query(queries[2]);
    const [thisMonthResult] = await pool.query(queries[3]);

    return {
      totalBooks: totalResult[0].total_books,
      averageRating: avgRatingResult[0].average_rating 
        ? parseFloat(avgRatingResult[0].average_rating).toFixed(1) 
        : 0,
      topAuthor: topAuthorResult[0] || { author: 'None', book_count: 0 },
      booksThisMonth: thisMonthResult[0].books_this_month
    };
  }
}

module.exports = Book;
