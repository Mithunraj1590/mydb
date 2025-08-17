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
  },
  "work/worktowander-dashboard": {
 
      "data": {
        "seo": {
          "metaTitle": "Worktowander Dashboard - Project Details",
          "metaDescription": "A comprehensive admin dashboard built with Next.js for managing work and travel bookings.",
          "metaImage": {
            "url": "/images/works/work1.png"
          }
        },
        "widgets": [
          {
            "widget_type": "WorkDetailBanner",
            "data": {
              "title": "Worktowander Dashboard",
              "date": "2024",
              "category": "Web Application",
              "description": "A comprehensive admin dashboard for managing work and travel bookings. Features include user management, booking system, analytics dashboard, and real-time notifications.",
            }
          },
          {
            "widget_type": "WorkDetail",
            "data": {
              "longDescription": "Worktowander Dashboard is a full-featured administrative interface designed to streamline the management of work and travel bookings. The platform provides an intuitive user experience with advanced filtering, search capabilities, and comprehensive reporting tools. Built with modern web technologies, it ensures fast performance and responsive design across all devices.",
              "image": "/images/works/work1.png",
              "gallery": [
                "/images/works/work1.png",
                "/images/works/work1-detail1.png",
                "/images/works/work1-detail2.png"
              ],
              "techStack": [
                {
                  "name": "Next.js",
                  "icon": "/images/skills/Nextjs_logo.svg"
                },
                {
                  "name": "React",
                  "icon": "/images/skills/React_logo.svg"
                },
                {
                  "name": "TypeScript",
                  "icon": "/images/skills/Typescript_logo.svg"
                },
                {
                  "name": "Tailwind CSS",
                  "icon": "/images/skills/Tailwind_logo.svg"
                }
              ],
              "features": [
                "User Authentication & Authorization",
                "Dashboard Analytics",
                "Booking Management System",
                "Real-time Notifications",
                "Responsive Design",
                "Admin Panel"
              ],
              "links": {
                "live": "https://worktowander.vercel.app/admin/dashboard",
                "github": "https://github.com/yourusername/worktowander-dashboard"
              },
              "challenges": "Implementing real-time notifications and ensuring optimal performance with large datasets were the main challenges. Solved using WebSocket connections and efficient data caching strategies.",
              "solutions": "Utilized Next.js API routes for backend functionality, implemented Redis for caching, and used Socket.io for real-time features."
            }
          }
        ]
      }
    
  },
  "work/ecommerce-platform": {

      data: {
        "seo": {
          "metaTitle": "E-commerce Platform - Project Details",
          "metaDescription": "Modern e-commerce platform with advanced features and payment integration.",
          "metaImage": {
            "url": "/images/works/work2.png"
          }
        },
        "widgets": [
          {
            "widget_type": "WorkDetailBanner",
            "data": {
              "title": "E-commerce Platform",
              "date": "2024",
              "category": "E-commerce",
              "description": "Modern e-commerce platform with advanced features including payment integration, inventory management, and customer analytics.",
            }
          },
          {
            "widget_type": "WorkDetail",
            "data": {
              "longDescription": "A comprehensive e-commerce solution built with modern web technologies. Features include secure payment processing, inventory management, order tracking, customer analytics, and a responsive design that works seamlessly across all devices.",
              "image": "/images/works/work2.png",
              "gallery": [
                "/images/works/work2.png",
                "/images/works/work2-detail1.png",
                "/images/works/work2-detail2.png"
              ],
              "techStack": [
                {
                  "name": "React",
                  "icon": "/images/skills/React_logo.svg"
                },
                {
                  "name": "Node.js",
                  "icon": "/images/skills/Nodejs_logo.svg"
                },
                {
                  "name": "MongoDB",
                  "icon": "/images/skills/MongoDB_logo.svg"
                },
                {
                  "name": "Stripe",
                  "icon": "/images/skills/Stripe_logo.svg"
                }
              ],
              "features": [
                "Secure Payment Processing",
                "Inventory Management",
                "Order Tracking",
                "Customer Analytics",
                "Responsive Design",
                "Admin Dashboard"
              ],
              "links": {
                "live": "https://ecommerce-platform.vercel.app",
                "github": "https://github.com/yourusername/ecommerce-platform"
              },
              "challenges": "Integrating multiple payment gateways and ensuring secure transaction processing while maintaining optimal performance.",
              "solutions": "Implemented Stripe for payment processing, used JWT for authentication, and optimized database queries for better performance."
            }
          }
        ]
      }
    
  },
  "work/task-management-app": {
  
      data: {
        "seo": {
          "metaTitle": "Task Management App - Project Details",
          "metaDescription": "Collaborative task management application with real-time updates and team collaboration.",
          "metaImage": {
            "url": "/images/works/work3.png"
          }
        },
        "widgets": [
          {
            "widget_type": "WorkDetailBanner",
            "data": {
              "title": "Task Management App",
              "date": "2024",
              "category": "Management System",
              "description": "Collaborative task management application with real-time updates, team collaboration, and progress tracking.",
            }
          },
          {
            "widget_type": "WorkDetail",
            "data": {
              "longDescription": "A modern task management application designed for teams to collaborate effectively. Features real-time updates, drag-and-drop task organization, team collaboration tools, and comprehensive progress tracking with analytics.",
              "image": "/images/works/work3.png",
              "gallery": [
                "/images/works/work3.png",
                "/images/works/work3-detail1.png",
                "/images/works/work3-detail2.png"
              ],
              "techStack": [
                {
                  "name": "Vue.js",
                  "icon": "/images/skills/Vuejs_logo.svg"
                },
                {
                  "name": "Firebase",
                  "icon": "/images/skills/Firebase_logo.svg"
                },
                {
                  "name": "Vuetify",
                  "icon": "/images/skills/Vuetify_logo.svg"
                }
              ],
              "features": [
                "Real-time Collaboration",
                "Drag & Drop Interface",
                "Team Management",
                "Progress Tracking",
                "File Sharing",
                "Mobile Responsive"
              ],
              "links": {
                "live": "https://task-management.vercel.app",
                "github": "https://github.com/yourusername/task-management"
              },
              "challenges": "Implementing real-time collaboration features and ensuring smooth drag-and-drop functionality across different devices.",
              "solutions": "Used Firebase Realtime Database for live updates, implemented WebSocket connections, and created a responsive drag-and-drop interface."
            }
          }
        ]
      }
    
  },
  "work/learning-platform": {
  
      data: {
        "seo": {
          "metaTitle": "Learning Platform - Project Details",
          "metaDescription": "Interactive learning platform with video courses and progress tracking.",
          "metaImage": {
            "url": "/images/works/work4.png"
          }
        },
        "widgets": [
          {
            "widget_type": "WorkDetailBanner",
            "data": {
              "title": "Learning Platform",
              "date": "2024",
              "category": "Education",
              "description": "Interactive learning platform with video courses, progress tracking, and personalized learning paths.",
            }
          },
          {
            "widget_type": "WorkDetail",
            "data": {
              "longDescription": "An innovative learning platform that provides interactive video courses, personalized learning paths, and comprehensive progress tracking. Built with modern technologies to deliver an engaging educational experience.",
              "image": "/images/works/work4.png",
              "gallery": [
                "/images/works/work4.png",
                "/images/works/work4-detail1.png",
                "/images/works/work4-detail2.png"
              ],
              "techStack": [
                {
                  "name": "Angular",
                  "icon": "/images/skills/Angular_logo.svg"
                },
                {
                  "name": "TypeScript",
                  "icon": "/images/skills/Typescript_logo.svg"
                },
                {
                  "name": "Material UI",
                  "icon": "/images/skills/MaterialUI_logo.svg"
                }
              ],
              "features": [
                "Video Course Management",
                "Progress Tracking",
                "Personalized Learning",
                "Interactive Quizzes",
                "Certificate Generation",
                "Mobile Learning"
              ],
              "links": {
                "live": "https://learning-platform.vercel.app",
                "github": "https://github.com/yourusername/learning-platform"
              },
              "challenges": "Handling large video files and implementing efficient progress tracking for thousands of users.",
              "solutions": "Used cloud storage for video files, implemented efficient caching strategies, and created a scalable progress tracking system."
            }
          }
        ]
      }
    
  }
};

// Dynamic works array for admin management
let dynamicWorks = [
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
];

// API Routes
app.get('/api/homepage', (req, res) => res.json(data.homepage));
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
            subtitle: "Portfolio Projects",
            works: dynamicWorks
          } 
        }
      ]
    }
  };
  res.json(worksData);
});
app.get('/api/contact', (req, res) => res.json(data.contact));

// Work detail routes
app.get('/api/work/worktowander-dashboard', (req, res) => {
  res.json(data['work/worktowander-dashboard']);
});

app.get('/api/work/ecommerce-platform', (req, res) => {
  res.json(data['work/ecommerce-platform']);
});

app.get('/api/work/task-management-app', (req, res) => {
  res.json(data['work/task-management-app']);
});

app.get('/api/work/learning-platform', (req, res) => {
  res.json(data['work/learning-platform']);
});

app.get('/api/works/:slug', (req, res) => res.status(404).json({ error: 'Work not found' }));

// Admin endpoints for managing works
app.get('/api/admin/works', (req, res) => {
  res.json(dynamicWorks);
});

app.post('/api/admin/works', (req, res) => {
  const newWork = {
    id: dynamicWorks.length + 1,
    ...req.body,
    featured: req.body.featured || false
  };
  dynamicWorks.push(newWork);
  res.json(newWork);
});

app.put('/api/admin/works/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dynamicWorks.findIndex(work => work.id === id);
  if (index !== -1) {
    dynamicWorks[index] = { ...dynamicWorks[index], ...req.body };
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
