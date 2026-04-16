const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Dashboard and Analytics pages
router.get('/', bookController.getDashboard);
router.get('/analytics', bookController.getAnalytics);

// Book CRUD operations
router.post('/books', bookController.createBook);
router.get('/books/:id', bookController.getBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Search
router.get('/search', bookController.searchBooks);

module.exports = router;
