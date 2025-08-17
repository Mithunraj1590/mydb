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

// Initialize database with error handling
let dbInitialized = false;
async function initializeDatabase() {
  if (dbInitialized) return;
  
  try {
    await db.initDatabase();
    console.log('Database initialized successfully');
    dbInitialized = true;
  } catch (err) {
    console.error('Database initialization failed:', err);
    // Don't throw error, continue without database for now
  }
}

// Initialize database on startup
initializeDatabase();

// Fallback data when database is not available
const fallbackData = {
  homepage: {
    data: {
      seo: {
        id: 5,
        metaTitle: "Mithun raj",
        metaDescription: "This is my personal portfolio site",
        metaOgImage: "",
        keywords: null,
        metaRobots: null,
        structuredData: null,
        metaViewport: null,
        canonicalURL: null,
        metaImage: {
          url: { alternativeText: null },
          alternativeText: null
        },
        metaSocial: []
      },
      widgets: [
        {
          widget_type: "HomeBanner",
          data: { title: "FRONTEND DEVELOPER" }
        },
        {
          widget_type: "HomeAbout",
          data: {
            title: "MITHUN RAJ",
            description: "I'm a lead WebApp Developer and Digital Designer building scalable, accessible, and technically tuned brands on the web.",
            link: { text: "ABOUT ME", url: "/about" },
            stack_title: "SERVICE TYPE",
            stack: [
              { title: "Web Application", link: { text: "KNOW MORE", url: "/" } },
              { title: "Progressive Web Application", link: { text: "KNOW MORE", url: "/" } },
              { title: "Decentralized applications", link: { text: "KNOW MORE", url: "/" } }
            ]
          }
        },
        {
          widget_type: "HomeWorks",
          data: {
            title: "FEATURED WORK",
            works: []
          }
        },
        {
          widget_type: "HomePrinciples",
          data: {
            title: "PRINCIPLES",
            main_title: "<span>DESIGN MEETS</span><span> DEVELOPMENT</span>",
            principles: [
              { title: "Systems-first", description: "Building systems for anything from design and development, to scoping and documentation is at the core of my process to driving results for every project I work on." },
              { title: "Accessibility and Usability", description: "Accessibility and usability are two important principles of front-end development that aim to make a website or web application easy to use and understand for all users, regardless of their abilities, preferences, or devices" },
              { title: "Performance and Optimization", description: "Performance and optimization are two related principles of front-end development that aim to make a website or web application fast and reliable for users." },
              { title: "Responsiveness and Cross-Browser Compatibility", description: "Responsiveness and cross-browser compatibility are two essential principles of front-end development that aim to make a website or web application adaptable and consistent across different devices and browsers" },
              { title: "Testing and Debugging", description: "Testing and debugging are essential for web development, as they prevent problems, improve user experience, increase trust and ensure the quality." }
            ]
          }
        },
        {
          widget_type: "HomeHire",
          data: {
            title: "SERVICES",
            main_title: "HIRE ME",
            services: [
              { title: "Consulting", description: "Agencies and in-house teams hire me to be embedded on their team for direct support on strategy, scoping, custom code, and training." },
              { title: "Design", description: "From strategy and brand, to web and product design, I help teams bring businesses to life with modern, memorable and minimal creative work." },
              { title: "Development", description: "With 3+ years creating for the web, I can join your upcoming project to lead development in a design-first, systematic way that will scale with your brand." }
            ]
          }
        }
      ]
    }
  },
  about: {
    data: {
      widgets: [
        {
          widget_type: "AboutBanner",
          data: {
            title: "CREATIVE MEETS TECHNICAL",
            image: "/images/about-me.png",
            description: "I'm a midwest family man with a love for design and front-end development. I have a deep desire to consistently learn from others and fuel my skills to design timeless brands, then develop them into reality with code."
          }
        },
        {
          widget_type: "AboutJourney",
          data: {
            title: "CAREER",
            career: [
              { start_date: "2024", end_date: "2025", experince: "7 month", designation: "Frontend Developer", company_name: "Nuox technologies", url: "" },
              { start_date: "2022", end_date: "2024", experince: "2.5 year", designation: "UI Developer", company_name: "Webandcrafts", url: "" },
              { start_date: "2021", end_date: "2022", experince: "1 year", designation: "Python Fullstack Developer", company_name: "Right Soft Options", url: "" }
            ]
          }
        },
        {
          widget_type: "AboutSkills",
          data: {
            title: "TECH STACK",
            skills: [
              { name: "HTML5", image: "/images/skills/Html5_logo.svg" },
              { name: "CSS", image: "/images/skills/cSS_logo.svg" },
              { name: "JAVASCRIPT", image: "/images/skills/Javascript_logo.svg" },
              { name: "TYPESCRIPT", image: "/images/skills/Typescript_logo.svg" },
              { name: "REACT", image: "/images/skills/React_logo.svg" },
              { name: "NEXTJS", image: "/images/skills/Nextjs_logo.svg" },
              { name: "VUEJS", image: "/images/skills/Vuejs_logo.svg" },
              { name: "GSAP", image: "/images/skills/Gsap_logo.svg" },
              { name: "BOOTSTRAP", image: "/images/skills/Bootstrap_logo.svg" },
              { name: "TAILWIND", image: "/images/skills/Tailwind_logo.svg" },
              { name: "SASS", image: "/images/skills/Sass_logo.svg" },
              { name: "WORDPRESS", image: "/images/skills/Wordpress_logo.svg" }
            ]
          }
        },
        {
          widget_type: "HomeHire",
          data: {
            title: "SERVICES",
            main_title: "HIRE ME",
            services: [
              { title: "Consulting", description: "Agencies and in-house teams hire me to be embedded on their team for direct support on strategy, scoping, custom code, and training." },
              { title: "Design", description: "From strategy and brand, to web and product design, I help teams bring businesses to life with modern, memorable and minimal creative work." },
              { title: "Development", description: "With 3+ years creating for the web, I can join your upcoming project to lead development in a design-first, systematic way that will scale with your brand." }
            ]
          }
        }
      ]
    }
  },
  works: {
    data: {
      widgets: [
        {
          widget_type: "WorkList",
          data: {
            title: "Works",
            description: "A collection of some of my favorite Digital Design and Development projects from the past few years. 🤓",
            category: [
              { value: "all", label: "All" },
              { value: "web-application", label: "Web Application" },
              { value: "e-commerce", label: "E-commerce" },
              { value: "management-system", label: "Management System" },
              { value: "education", label: "Education" }
            ],
            works: []
          }
        }
      ]
    }
  },
  contact: {
    data: {
      widgets: [
        {
          widget_type: "ContactUs",
          data: {
            title: "Lets's build something great togather",
            mobile: "+91 7907348596",
            email: "mithunmacsafe@gmail.com"
          }
        }
      ]
    }
  }
};

// API Routes - maintaining the same structure as db.json

// Homepage API
app.get('/api/homepage', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const data = await db.getHomepage();
      res.json(data);
    } else {
      // Return fallback data if database is not available
      res.json(fallbackData.homepage);
    }
  } catch (error) {
    console.error('Homepage API error:', error);
    // Return fallback data on error
    res.json(fallbackData.homepage);
  }
});

// About API
app.get('/api/about', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const data = await db.getAbout();
      res.json(data);
    } else {
      res.json(fallbackData.about);
    }
  } catch (error) {
    console.error('About API error:', error);
    res.json(fallbackData.about);
  }
});

// Works API (all works)
app.get('/api/works', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const data = await db.getWorks();
      res.json(data);
    } else {
      res.json(fallbackData.works);
    }
  } catch (error) {
    console.error('Works API error:', error);
    res.json(fallbackData.works);
  }
});

// Single work API
app.get('/api/works/:slug', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const data = await db.getWork(req.params.slug);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Work not found' });
    }
  } catch (error) {
    console.error('Single work API error:', error);
    res.status(404).json({ error: 'Work not found' });
  }
});

// Contact API
app.get('/api/contact', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const data = await db.getContact();
      res.json(data);
    } else {
      res.json(fallbackData.contact);
    }
  } catch (error) {
    console.error('Contact API error:', error);
    res.json(fallbackData.contact);
  }
});

// Admin Routes for managing works

// Get all works for admin
app.get('/api/admin/works', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const works = await db.getAllWorks();
      res.json(works);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Admin works API error:', error);
    res.json([]);
  }
});

// Add new work
app.post('/api/admin/works', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const result = await db.addWork(req.body);
      res.json(result);
    } else {
      res.status(500).json({ error: 'Database not available' });
    }
  } catch (error) {
    console.error('Add work API error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update work
app.put('/api/admin/works/:id', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const result = await db.updateWork(req.params.id, req.body);
      res.json(result);
    } else {
      res.status(500).json({ error: 'Database not available' });
    }
  } catch (error) {
    console.error('Update work API error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete work
app.delete('/api/admin/works/:id', async (req, res) => {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
    }
    
    if (dbInitialized) {
      const result = await db.deleteWork(req.params.id);
      res.json(result);
    } else {
      res.status(500).json({ error: 'Database not available' });
    }
  } catch (error) {
    console.error('Delete work API error:', error);
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
