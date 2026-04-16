const Book = require('../models/Book');

// Get all books and render dashboard
exports.getDashboard = async (req, res) => {
  try {
    const sortBy = req.query.sort || 'date_read';
    const order = req.query.order || 'DESC';
    
    const books = await Book.getAll(sortBy, order);
    const statistics = await Book.getStatistics();
    
    res.render('dashboard', {
      books,
      statistics,
      sortBy,
      order,
      title: 'Dashboard - BookMind'
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).render('error', { 
      message: 'Error loading dashboard'
    });
  }
};

// Get analytics page
exports.getAnalytics = async (req, res) => {
  try {
    const statistics = await Book.getStatistics();
    const books = await Book.getAll('date_read', 'DESC');
    
    res.render('analytics', {
      statistics,
      books,
      title: 'Analytics - BookMind'
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).render('error', { 
      message: 'Error loading analytics'
    });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, rating, notes, date_read, cover_id } = req.body;
    
    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and author are required' 
      });
    }
    
    const bookData = {
      title,
      author,
      rating: rating || null,
      notes: notes || '',
      date_read: date_read || null,
      cover_id: cover_id || ''
    };
    
    const newBook = await Book.create(bookData);
    
    res.json({ 
      success: true, 
      message: 'Book added successfully',
      book: newBook 
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding book' 
    });
  }
};

// Update an existing book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, rating, notes, date_read, cover_id } = req.body;
    
    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and author are required' 
      });
    }
    
    const bookData = {
      title,
      author,
      rating: rating || null,
      notes: notes || '',
      date_read: date_read || null,
      cover_id: cover_id || ''
    };
    
    const updatedBook = await Book.update(id, bookData);
    
    if (!updatedBook) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Book updated successfully',
      book: updatedBook 
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating book' 
    });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedBook = await Book.delete(id);
    
    if (!deletedBook) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Book deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting book' 
    });
  }
};

// Get a single book by ID (for editing)
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.getById(id);
    
    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }
    
    res.json({ 
      success: true, 
      book 
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching book' 
    });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json({ 
        success: true, 
        books: [] 
      });
    }
    
    const books = await Book.search(q);
    
    res.json({ 
      success: true, 
      books 
    });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error searching books' 
    });
  }
};
