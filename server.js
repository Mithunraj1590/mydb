const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database
db.initDatabase().then(() => {
  console.log('Database initialized successfully');
}).catch(err => {
  console.error('Database initialization failed:', err);
});

// API Routes - maintaining the same structure as db.json

// Homepage API
app.get('/api/homepage', async (req, res) => {
  try {
    const data = await db.getHomepage();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// About API
app.get('/api/about', async (req, res) => {
  try {
    const data = await db.getAbout();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Works API (all works)
app.get('/api/works', async (req, res) => {
  try {
    const data = await db.getWorks();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Single work API
app.get('/api/works/:slug', async (req, res) => {
  try {
    const data = await db.getWork(req.params.slug);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Work not found' });
  }
});

// Contact API
app.get('/api/contact', async (req, res) => {
  try {
    const data = await db.getContact();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Routes for managing works

// Get all works for admin
app.get('/api/admin/works', async (req, res) => {
  try {
    const works = await db.getAllWorks();
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new work
app.post('/api/admin/works', async (req, res) => {
  try {
    const result = await db.addWork(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update work
app.put('/api/admin/works/:id', async (req, res) => {
  try {
    const result = await db.updateWork(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete work
app.delete('/api/admin/works/:id', async (req, res) => {
  try {
    const result = await db.deleteWork(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
