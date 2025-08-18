const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// File paths for data persistence
const DATA_FILE = path.join(__dirname, '../data/works.json');
const DETAILS_FILE = path.join(__dirname, '../data/work-details.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load saved data on startup
function loadSavedData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const worksData = fs.readFileSync(DATA_FILE, 'utf8');
      dynamicWorks = JSON.parse(worksData);
    }
    if (fs.existsSync(DETAILS_FILE)) {
      const detailsData = fs.readFileSync(DETAILS_FILE, 'utf8');
      dynamicWorkDetails = JSON.parse(detailsData);
    }
  } catch (error) {
    console.log('No saved data found or error loading data:', error.message);
  }
}

// Save data to files
function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dynamicWorks, null, 2));
    fs.writeFileSync(DETAILS_FILE, JSON.stringify(dynamicWorkDetails, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Dynamic works array for admin management - starts empty
let dynamicWorks = [];

// Dynamic work detail pages - starts empty
let dynamicWorkDetails = {};

// Load saved data on startup
loadSavedData();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Static data for non-dynamic pages
const data = {
  about: {
    data: {
      "widgets": [
        {
          "widget_type": "AboutBanner",
          "data": {
            "title": "CREATIVE MEETS TECHNICAL",
            "image":"/images/about-me.png",
            "description": "I'm a midwest family man with a love for design and front-end development. I have a deep desire to consistently learn from others and fuel my skills to design timeless brands, then develop them into reality with code."
          }
        },
        {
          "widget_type": "AboutJourney",
          "data":{
            "title":"CAREER",
            "career":[
              {
                "start_date":"2024",
                "end_date":"2025",
                "experince":"7 month",
                "designation":"Frontend Developer",
                "company_name":"Nuox technologies",
                "url":""
              },
              {
                "start_date":"2022",
                "end_date":"2024",
                "experince":"2.5 year",
                "designation":"UI Developer",
                "company_name":"Webandcrafts",
                "url":""
              },
              {
                "start_date":"2021",
                "end_date":"2022",
                "experince":"1 year",
                "designation":"Python Fullstack Developer",
                "company_name":"Right Soft Options",
                "url":""
              }
            ]
          }
        },
        {
          "widget_type": "AboutSkills",
          "data":{
            "title":"TECH STACK",
            "skills":[
                {
                  "name":"HTML5",
                  "image":"/images/skills/Html5_logo.svg"
                },
                {
                  "name":"CSS",
                   "image":"/images/skills/cSS_logo.svg"
                },
                {
                  "name":"JAVASCRIPT",
                   "image":"/images/skills/Javascript_logo.svg"
                },
               
                {
                  "name":"TYPESCRIPT",
                   "image":"/images/skills/Typescript_logo.svg"
                },
                {
                  "name":"REACT",
                   "image":"/images/skills/React_logo.svg"
                },
                {
                  "name":"NEXTJS",
                   "image":"/images/skills/Nextjs_logo.svg"
                },
                {
                  "name":"VUEJS",
                   "image":"/images/skills/Vuejs_logo.svg"
                },
                {
                  "name":"GSAP",
                   "image":"/images/skills/Gsap_logo.svg"
                },
                {
                  "name":"BOOTSTRAP",
                   "image":"/images/skills/Bootstrap_logo.svg"
                },
                {
                  "name":"TAILWIND",
                   "image":"/images/skills/Tailwind_logo.svg"
                },
                {
                  "name":"SASS",
                   "image":"/images/skills/Sass_logo.svg"
                },
                {
                  "name":"WORDPRESS",
                   "image":"/images/skills/Wordpress_logo.svg"
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
            email: "mithunmacsafe@gmail.com",
            location: "Calicut,Kerala, India",
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
app.get('/api/homepage', (req, res) => {
  // Create homepage data dynamically to include current works
  const homepageData = {
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
          "widget_type": "HomeAbout",
          "data": {
            "title": "MITHUN RAJ",
            "description": "I'm a lead WebApp Developer and Digital Designer building scalable, accessible, and technically tuned brands on the web.",
            "link": {
              "text": "ABOUT ME",
              "url": "/about"
            },
            "stack_title": "SERVICE TYPE",
            "stack": [
              {
                "title": "Web Application",
                "link": {
                  "text": "KNOW MORE",
                  "url": "/"
                }
              },
              {
                "title": "Prograssive Web Application",
                "link": {
                  "text": "KNOW MORE",
                  "url": "/"
                }
              },
              {
                "title": "Decentralized applications",
                "link": {
                  "text": "KNOW MORE",
                  "url": "/"
                }
              }
            ]
          }
        },
        {
          widget_type: "HomeWorks",
          data: {
            title: "Featured Works",
            works: dynamicWorks.slice(0, 4) // Show only first 4 works from dynamic data
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
  };
  res.json(homepageData);
});

app.get('/api/about', (req, res) => res.json(data.about));

app.get('/api/works', (req, res) => {
  // Return dynamic works data
  const worksData = {
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
            "description": "A collection of some of my favorite Digital Design and Development projects from the past few years. 🤓",
            "category": [
              {
                "value": "all",
                "label": "All"
              },
              {
                "value": "fashion",
                "label": "Fashion"
              },
              {
                "value": "media",
                "label": "Media"
              },
              {
                "value": "social",
                "label": "Social"
              },
              {
                "value": "travel-and-tourism",
                "label": "Social"
              },
              {
                "value": "electronics",
                "label": "Electronics"
              }
            ],
            works: dynamicWorks
          } 
        }
      ]
    }
  };
  res.json(worksData);
});

app.get('/api/contact', (req, res) => res.json(data.contact));

// Dynamic work detail route
app.get('/api/work/:slug', (req, res) => {
  const slug = req.params.slug;
  
  if (dynamicWorkDetails[slug]) {
    res.json(dynamicWorkDetails[slug]);
  } else {
    res.status(404).json({ error: 'Work detail not found' });
  }
});

// Admin endpoints for managing works
app.get('/api/admin/works', (req, res) => {
  res.json(dynamicWorks);
});

app.get('/api/admin/works/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const work = dynamicWorks.find(work => work.id === id);
  if (work) {
    res.json(work);
  } else {
    res.status(404).json({ error: 'Work not found' });
  }
});

app.post('/api/admin/works', (req, res) => {
  const newWork = {
    id: dynamicWorks.length + 1,
    ...req.body,
    featured: req.body.featured || false
  };
  dynamicWorks.push(newWork);
  
  // Create work detail page dynamically using provided slug
  const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Store work detail in dynamic object
  dynamicWorkDetails[slug] = {
    data: {
      seo: {
        metaTitle: req.body.title,
        metaDescription: req.body.description || `Project details for ${req.body.title}`
      },
      slug: slug,
      widgets: [
        {
          widget_type: "WorkDetailBanner",
          data: {
            title: req.body.title,
            description: req.body.description || "",
            category: req.body.category || "Web Application",
            date: req.body.date || "2024",
            image: req.body.image || "/images/works/default.png",
            featured: req.body.featured || false,
            url: req.body.links?.live || "",
            github: req.body.links?.github || ""
          }
        },
        {
          widget_type: "AboutSkills",
          data: {
            title: "Tech Stack",
            skills: req.body.techStack || [
              {
                name: "React",
                icon: "/images/skills/React_logo.svg"
              }
            ]
          }
        },
        {
          widget_type: "WorkDetail",
          data: {
            "title": "ABOUT",
            "main_title": "Project",
            description: req.body.longDescription || req.body.description || "",
            details: [
              {
                title: "Challenges",
                description: req.body.challenges || "Technical challenges and solutions will be added here."
              },
              {
                title: "Solutions",
                description: req.body.solutions || "Solutions and implementation details will be added here."
              },
              {
                title: "Results",
                description: req.body.results || "Project results and outcomes will be added here."
              }
            ]
          }
        },
        {
          widget_type: "ImageGrid",
          data: {
            title: "Project Gallery",
            images: req.body.gallery || [req.body.image || "/images/works/default.png"]
          }
        }
      ]
    }
  };
  
  // Save data to files
  saveData();
  
  res.json(newWork);
});

app.put('/api/admin/works/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dynamicWorks.findIndex(work => work.id === id);
  if (index !== -1) {
    // Update the work in the array
    dynamicWorks[index] = { ...dynamicWorks[index], ...req.body };
    
    // Also update the corresponding work detail page
    const slug = req.body.slug || dynamicWorks[index].slug || dynamicWorks[index].title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Remove old work detail if slug changed
    const oldSlug = dynamicWorks[index].slug || dynamicWorks[index].title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (oldSlug !== slug && dynamicWorkDetails[oldSlug]) {
      delete dynamicWorkDetails[oldSlug];
    }
    
    // Update or create work detail page
    dynamicWorkDetails[slug] = {
      data: {
        seo: {
          metaTitle: req.body.title || dynamicWorks[index].title,
          metaDescription: req.body.description || `Project details for ${req.body.title || dynamicWorks[index].title}`
        },
        slug: slug,
        widgets: [
          {
            widget_type: "WorkDetailBanner",
            data: {
              title: req.body.title || dynamicWorks[index].title,
              description: req.body.description || "",
              category: req.body.category || "Web Application",
              date: req.body.date || "2024",
              image: req.body.image || "/images/works/default.png",
              featured: req.body.featured || false,
              url: req.body.links?.live || "",
              github: req.body.links?.github || ""
            }
          },
          {
            widget_type: "AboutSkills",
            data: {
              title: "Tech Stack",
              skills: req.body.techStack || [
                {
                  name: "React",
                  icon: "/images/skills/React_logo.svg"
                }
              ]
            }
          },
          {
            widget_type: "WorkDetail",
            data: {
              "title": "ABOUT",
              "main_title": "Project",
              description: req.body.longDescription || req.body.description || "",
              details: [
                {
                  title: "Challenges",
                  description: req.body.challenges || "Technical challenges and solutions will be added here."
                },
                {
                  title: "Solutions",
                  description: req.body.solutions || "Solutions and implementation details will be added here."
                },
                {
                  title: "Results",
                  description: req.body.results || "Project results and outcomes will be added here."
                }
              ]
            }
          },
          {
            widget_type: "ImageGrid",
            data: {
              title: "Project Gallery",
              images: req.body.gallery || [req.body.image || "/images/works/default.png"]
            }
          }
        ]
      }
    };
    
    // Save data to files
    saveData();
    
    res.json(dynamicWorks[index]);
  } else {
    res.status(404).json({ error: 'Work not found' });
  }
});

app.delete('/api/admin/works/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dynamicWorks.findIndex(work => work.id === id);
  if (index !== -1) {
    const deletedWork = dynamicWorks.splice(index, 1)[0];
    
    // Also delete the corresponding work detail page
    const slug = deletedWork.slug || deletedWork.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (dynamicWorkDetails[slug]) {
      delete dynamicWorkDetails[slug];
    }
    
    // Save data to files
    saveData();
    
    res.json(deletedWork);
  } else {
    res.status(404).json({ error: 'Work not found' });
  }
});

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
