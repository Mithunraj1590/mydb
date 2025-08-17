const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Static data with complete content
const data = {
  homepage: {
    data: {
      seo: { 
        metaTitle: "Mithun raj", 
        metaDescription: "Portfolio site" 
      },
      widgets: [
        { 
          widget_type: "HomeBanner", 
          data: { 
            title: "FRONTEND DEVELOPER",
            subtitle: "Creative Web Developer",
            description: "Building modern web applications with cutting-edge technologies"
          } 
        },
        { 
          widget_type: "HomeAbout", 
          data: { 
            title: "MITHUN RAJ", 
            description: "WebApp Developer",
            bio: "Passionate frontend developer with expertise in React, Next.js, and modern web technologies. Creating beautiful and functional user experiences.",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]
          } 
        },
        {
          widget_type: "HomeWorks",
          data: {
            title: "Featured Works",
            works: [
              {
                id: 1,
                title: "Worktowander Dashboard",
                category: "Web Application",
                date: "2024",
                image: "/images/works/work1.png",
                description: "A comprehensive admin dashboard for managing work and travel bookings."
              },
              {
                id: 2,
                title: "E-commerce Platform",
                category: "E-commerce",
                date: "2024",
                image: "/images/works/work2.png",
                description: "Modern e-commerce platform with advanced features and payment integration."
              },
              {
                id: 3,
                title: "Task Management App",
                category: "Management System",
                date: "2024",
                image: "/images/works/work3.png",
                description: "Collaborative task management application with real-time updates."
              },
              {
                id: 4,
                title: "Learning Platform",
                category: "Education",
                date: "2024",
                image: "/images/works/work4.png",
                description: "Interactive learning platform with video courses and progress tracking."
              }
            ]
          }
        },
        {
          "widget_type": "HomePrinciples",
          "data": {
            "title": "PRINCIPLES",
            "main_title": "<span>DESIGN MEETS</span><span> DEVELOPMENT</span>",
            "principles": [
              {
                "title": "Systems-first",
                "description": "Building systems for anything from design and development, to scoping and documentation is at the core of my process to driving results for every project I work on."
              },
              {
                "title": "Accessibility and Usability",
                "description": "Accessibility and usability are two important principles of front-end development that aim to make a website or web application easy to use and understand for all users, regardless of their abilities, preferences, or devices"
              },
              {
                "title": "Performance and Optimization",
                "description": "Performance and optimization are two related principles of front-end development that aim to make a website or web application fast and reliable for users."
              },
              {
                "title": "Responsiveness and Cross-Browser Compatibility",
                "description": "Responsiveness and cross-browser compatibility are two essential principles of front-end development that aim to make a website or web application adaptable and consistent across different devices and browsers"
              },
              {
                "title": "Testing and Debugging",
                "description": "Testing and debugging are essential for web development, as they prevent problems, improve user experience, increase trust and ensure the quality."
              }
            ]
          }
        },
        {
          "widget_type": "HomeHire",
          "data": {
            "title": "SERVICES",
            "main_title": "HIRE ME",
            "services": [
              {
                "title": "Consulting ",
                "description": "Agencies and in-house teams hire me to be embedded on their team for direct support on strategy, scoping, custom code, and training."
              },
              {
                "title": "Design ",
                "description": "From strategy and brand, to web and product design, I help teams bring businesses to life with modern, memorable and minimal creative work."
              },
              {
                "title": "Development ",
                "description": "With 3+ years creating for the web, I can join your upcoming project to lead development in a design-first, systematic way that will scale with your brand."
              }
            ]
          }
        }
      ]
    }
  },
  about: {
    data: {
      seo: {
        metaTitle: "About - Mithun raj",
        metaDescription: "Learn more about Mithun raj, a passionate frontend developer"
      },
      widgets: [
        { 
          widget_type: "AboutBanner", 
          data: { 
            title: "CREATIVE MEETS TECHNICAL",
            subtitle: "About Me",
            description: "I'm a passionate frontend developer who loves creating beautiful and functional web applications."
          } 
        },
        {
          widget_type: "AboutContent",
          data: {
            bio: "With over 3 years of experience in web development, I specialize in creating modern, responsive web applications using React, Next.js, and other cutting-edge technologies. I believe in writing clean, maintainable code and creating exceptional user experiences.",
            skills: [
              { name: "React", level: 90 },
              { name: "Next.js", level: 85 },
              { name: "TypeScript", level: 80 },
              { name: "Tailwind CSS", level: 95 },
              { name: "Node.js", level: 75 }
            ],
            experience: "3+ years",
            projects: "20+ completed"
          }
        }
      ]
    }
  },
  works: {
    data: {
      seo: {
        metaTitle: "Works - Mithun raj",
        metaDescription: "Portfolio of web development projects by Mithun raj"
      },
      widgets: [
        { 
          widget_type: "WorkList", 
          data: { 
            title: "My Works",
            subtitle: "Portfolio Projects",
            works: [
              {
                id: 1,
                title: "Worktowander Dashboard",
                category: "Web Application",
                date: "2024",
                image: "/images/works/work1.png",
                description: "A comprehensive admin dashboard for managing work and travel bookings. Features include user management, booking system, analytics dashboard, and real-time notifications.",
                featured: true
              },
              {
                id: 2,
                title: "E-commerce Platform",
                category: "E-commerce",
                date: "2024",
                image: "/images/works/work2.png",
                description: "Modern e-commerce platform with advanced features including payment integration, inventory management, and customer analytics.",
                featured: true
              },
              {
                id: 3,
                title: "Task Management App",
                category: "Management System",
                date: "2024",
                image: "/images/works/work3.png",
                description: "Collaborative task management application with real-time updates, team collaboration, and progress tracking.",
                featured: true
              },
              {
                id: 4,
                title: "Learning Platform",
                category: "Education",
                date: "2024",
                image: "/images/works/work4.png",
                description: "Interactive learning platform with video courses, progress tracking, and personalized learning paths.",
                featured: true
              },
              {
                id: 5,
                title: "Weather App",
                category: "Web Application",
                date: "2024",
                image: "/images/works/work5.png",
                description: "Real-time weather application with location-based forecasts and interactive maps.",
                featured: false
              },
              {
                id: 6,
                title: "Blog Platform",
                category: "Content Management",
                date: "2024",
                image: "/images/works/work6.png",
                description: "Modern blog platform with markdown support, SEO optimization, and social sharing features.",
                featured: false
              }
            ]
          } 
        }
      ]
    }
  },
  contact: {
    data: {
      seo: {
        metaTitle: "Contact - Mithun raj",
        metaDescription: "Get in touch with Mithun raj for web development projects"
      },
      widgets: [
        { 
          widget_type: "ContactUs", 
          data: { 
            title: "Get In Touch",
            subtitle: "Let's work together",
            description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
            mobile: "+91 7907348596",
            email: "mithunraj@example.com",
            location: "Chennai, India",
            social: {
              github: "https://github.com/mithunraj",
              linkedin: "https://linkedin.com/in/mithunraj",
              twitter: "https://twitter.com/mithunraj"
            }
          } 
        }
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
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Export for Vercel serverless function
module.exports = app;
