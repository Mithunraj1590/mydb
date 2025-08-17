const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simple static data
const data = {
  homepage: {
    data: {
      seo: { metaTitle: "Mithun raj", metaDescription: "Portfolio site" },
      widgets: [
        { widget_type: "HomeBanner", data: { title: "FRONTEND DEVELOPER" } },
        { widget_type: "HomeAbout", data: { title: "MITHUN RAJ", description: "WebApp Developer" } }
      ]
    }
  },
  about: {
    data: {
      widgets: [
        { widget_type: "AboutBanner", data: { title: "CREATIVE MEETS TECHNICAL" } }
      ]
    }
  },
  works: {
    data: {
      widgets: [
        { widget_type: "WorkList", data: { title: "Works", works: [] } }
      ]
    }
  },
  contact: {
    data: {
      widgets: [
        { widget_type: "ContactUs", data: { title: "Contact", mobile: "+91 7907348596" } }
      ]
    }
  }
};

// API Routes
app.get('/api/homepage', (req, res) => res.json(data.homepage));
app.get('/api/about', (req, res) => res.json(data.about));
app.get('/api/works', (req, res) => res.json(data.works));
app.get('/api/contact', (req, res) => res.json(data.contact));
app.get('/api/works/:slug', (req, res) => res.status(404).json({ error: 'Work not found' }));
app.get('/api/admin/works', (req, res) => res.json([]));

// Admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Start server only if not in serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
