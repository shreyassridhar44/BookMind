// BookMind - Main JavaScript
// Handles modals, form submissions, search, and dynamic interactions

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const modal = document.getElementById('bookModal');
  const addBookBtn = document.getElementById('addBookBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const bookForm = document.getElementById('bookForm');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const booksGrid = document.getElementById('booksGrid');
  
  // Modal Functions
  function openModal(mode = 'add', bookData = null) {
    modal.classList.add('active');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const bookId = document.getElementById('bookId');
    
    if (mode === 'edit' && bookData) {
      modalTitle.textContent = 'Edit Book';
      submitBtn.textContent = 'Update Book';
      bookId.value = bookData.id;
      document.getElementById('title').value = bookData.title;
      document.getElementById('author').value = bookData.author;
      document.getElementById('rating').value = bookData.rating || '';
      document.getElementById('date_read').value = bookData.date_read || '';
      document.getElementById('cover_id').value = bookData.cover_id || '';
      document.getElementById('notes').value = bookData.notes || '';
      document.getElementById('days_to_read').value = bookData.days_to_read || 1;
    } else {
      modalTitle.textContent = 'Add New Book';
      submitBtn.textContent = 'Add Book';
      bookForm.reset();
      bookId.value = '';
    }
  }
  
  function closeModal() {
    modal.classList.remove('active');
    bookForm.reset();
    document.getElementById('bookId').value = '';
  }
  
  // Event Listeners for Modal
  addBookBtn.addEventListener('click', () => openModal('add'));
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Form Submission
  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;
    
    const formData = new FormData(bookForm);
    const bookData = {
      title: formData.get('title'),
      author: formData.get('author'),
      rating: formData.get('rating') ? parseInt(formData.get('rating')) : null,
      date_read: formData.get('date_read') || null,
      cover_id: formData.get('cover_id') || '',
      notes: formData.get('notes') || '',
      days_to_read: formData.get('days_to_read') ? parseInt(formData.get('days_to_read')) : 1
    };
    
    const bookId = document.getElementById('bookId').value;
    const isEdit = !!bookId;
    
    try {
      const url = isEdit ? `/books/${bookId}` : '/books';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        showFlashMessage(result.message, 'success');
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        showFlashMessage(result.message, 'error');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      showFlashMessage('Error saving book. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // Search Functionality
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const searchTerm = e.target.value.trim();
      
      if (searchTerm.length === 0) {
        window.location.href = '/';
        return;
      }
      
      searchTimeout = setTimeout(async () => {
        try {
          const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json();
          
          if (result.success) {
            renderBooks(result.books);
          }
        } catch (error) {
          console.error('Error searching books:', error);
        }
      }, 300);
    });
  }
  
  // Sort Functionality
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const [sortBy, order] = e.target.value.split('-');
      window.location.href = `/?sort=${sortBy}&order=${order}`;
    });
  }
  
  // Render Books Function
  function renderBooks(books) {
    if (!booksGrid) return;
    
    if (books.length === 0) {
      booksGrid.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <h3>No books found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      `;
      return;
    }

    const getCoverUrl = (coverId) => {
      const cleanId = coverId.trim().toUpperCase();
      let type = 'id';
      if (cleanId.startsWith('OL')) {
        type = 'olid';
      } else if (cleanId.length === 10 || cleanId.length === 13) {
        type = 'isbn';
      }
      return `https://covers.openlibrary.org/b/${type}/${cleanId}-M.jpg`;
    };
    
    booksGrid.innerHTML = books.map(book => `
      <div class="book-card" data-id="${book.id}">
        <div class="book-cover">
          ${book.cover_id 
            ? `<img src="${getCoverUrl(book.cover_id)}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Cover'">`
            : `<div class="book-cover-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>`
          }
        </div>
        
        <div class="book-info">
          <h3 class="book-title" title="${book.title}">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          
          ${book.rating ? `
            <div class="book-rating">
              ${generateStars(book.rating)}
            </div>
          ` : ''}
          
          ${book.date_read ? `
            <p class="book-date">Read: ${new Date(book.date_read).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          ` : ''}
          
          ${book.notes ? `
            <p class="book-notes">${book.notes.substring(0, 100)}${book.notes.length > 100 ? '...' : ''}</p>
          ` : ''}
        </div>
        
        <div class="book-actions">
          <button class="btn-icon btn-edit" data-id="${book.id}" title="Edit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon btn-delete" data-id="${book.id}" title="Delete">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
    
    attachEventListeners();
  }
  
  // Generate Star Rating HTML
  function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return stars;
  }
  
  // Attach Event Listeners to dynamically created buttons
  function attachEventListeners() {
    document.querySelectorAll('.btn-edit').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener('click', async (e) => {
        const bookId = e.currentTarget.dataset.id;

        try {
          const response = await fetch(`/books/${bookId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json();

          if (result.success) {
            openModal('edit', result.book);
          } else {
            showFlashMessage('Error loading book data', 'error');
          }
        } catch (error) {
          console.error('Error fetching book:', error);
          showFlashMessage('Error loading book data', 'error');
        }
      });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "true";

      btn.addEventListener('click', async (e) => {
        const bookId = e.currentTarget.dataset.id;
        const currentBtn = e.currentTarget;
        
        if (confirm('Are you sure you want to delete this book?')) {
          // Instantly disable the button so it can't be clicked again
          currentBtn.style.pointerEvents = 'none';

          try {
            const response = await fetch(`/books/${bookId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            const result = await response.json();
            
            if (result.success) {
              showFlashMessage(result.message, 'success');
              const bookCard = currentBtn.closest('.book-card');
              
              // Fade it out
              bookCard.style.opacity = '0';
              bookCard.style.transform = 'scale(0.9)';
              
              // Remove it from the DOM after animation
              setTimeout(() => {
                bookCard.remove();
                
                // If it was the last book, reload to show empty state
                if (booksGrid && booksGrid.querySelectorAll('.book-card').length === 0) {
                  window.location.reload();
                }
              }, 300);
            } else {
              showFlashMessage(result.message, 'error');
              currentBtn.style.pointerEvents = 'auto'; // re-enable if failed
            }
          } catch (error) {
            console.error('Error deleting book:', error);
            showFlashMessage('Error deleting book', 'error');
            currentBtn.style.pointerEvents = 'auto'; // re-enable if failed
          }
        }
      });
    });
  }
  
  // Flash Message Function
  function showFlashMessage(message, type = 'info') {
    const flashContainer = document.getElementById('flashMessages');
    const flashMessage = document.createElement('div');
    flashMessage.className = `flash-message ${type}`;
    flashMessage.textContent = message;
    
    flashContainer.appendChild(flashMessage);
    
    setTimeout(() => {
      flashMessage.style.opacity = '0';
      flashMessage.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        flashMessage.remove();
      }, 300);
    }, 3000);
  }
  
  // Initialize event listeners for existing buttons
  attachEventListeners();
});