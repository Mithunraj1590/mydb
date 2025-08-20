const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// File paths for data persistence in repository
const DATA_FILE = path.join(__dirname, '../data/works.json');
const DETAILS_FILE = path.join(__dirname, '../data/work-details.json');

// Load saved data on startup (read-only operation)
function loadSavedData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const worksData = fs.readFileSync(DATA_FILE, 'utf8');
      dynamicWorks = JSON.parse(worksData);
      console.log(`Loaded ${dynamicWorks.length} works from ${DATA_FILE}`);
    } else {
      console.log('No works data file found, starting with empty array');
    }
    
    if (fs.existsSync(DETAILS_FILE)) {
      const detailsData = fs.readFileSync(DETAILS_FILE, 'utf8');
      dynamicWorkDetails = JSON.parse(detailsData);
      console.log(`Loaded ${Object.keys(dynamicWorkDetails).length} work details from ${DETAILS_FILE}`);
    } else {
      console.log('No work details file found, starting with empty object');
    }
  } catch (error) {
    console.log('Error loading saved data:', error.message);
    console.log('Starting with empty data arrays');
  }
}

// Function to parse longDescription and format it with HTML tags (CMS-style)
function parseLongDescription(longDescription) {
  if (!longDescription) return "";
  
  // Split by double newlines to separate paragraphs
  const paragraphs = longDescription.split('\n\n');
  
  let htmlContent = '';
  
  paragraphs.forEach(paragraph => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return;
    
    // Check for markdown-style headings
    if (trimmedParagraph.startsWith('# ')) {
      htmlContent += `<h1>${trimmedParagraph.substring(2)}</h1>`;
    } else if (trimmedParagraph.startsWith('## ')) {
      htmlContent += `<h2>${trimmedParagraph.substring(3)}</h2>`;
    } else if (trimmedParagraph.startsWith('### ')) {
      htmlContent += `<h3>${trimmedParagraph.substring(4)}</h3>`;
    } else if (trimmedParagraph.match(/^[🎯👥💼🎨🔧🌍]/)) {
      // This is a section header with emoji
      htmlContent += `<h3>${trimmedParagraph}</h3>`;
    } else if (trimmedParagraph.match(/^[A-Z][A-Z\s]+:$/)) {
      // This is a section header in ALL CAPS with colon
      htmlContent += `<h3>${trimmedParagraph}</h3>`;
    } else if (trimmedParagraph.includes('\n') && trimmedParagraph.includes(':')) {
      // This might be a list section with header
      const lines = trimmedParagraph.split('\n');
      const header = lines[0];
      const listItems = lines.slice(1).filter(line => line.trim());
      
      htmlContent += `<h4>${header}</h4>`;
      if (listItems.length > 0) {
        htmlContent += '<ul>';
        listItems.forEach(item => {
          const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
          if (cleanItem) {
            htmlContent += `<li>${cleanItem}</li>`;
          }
        });
        htmlContent += '</ul>';
      }
    } else if (trimmedParagraph.includes('\n')) {
      // This is a list section without a header
      const lines = trimmedParagraph.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        // Check if it's a list (starts with bullet points or has multiple lines)
        const isList = lines.some(line => line.match(/^[-•*]/)) || lines.length > 2;
        
        if (isList) {
          htmlContent += '<ul>';
          lines.forEach(line => {
            const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
            if (cleanLine) {
              htmlContent += `<li>${cleanLine}</li>`;
            }
          });
          htmlContent += '</ul>';
        } else {
          // Multiple lines but not a list - treat as paragraphs
          lines.forEach(line => {
            if (line.trim()) {
              htmlContent += `<p>${line.trim()}</p>`;
            }
          });
        }
      }
    } else {
      // This is a regular paragraph - process markdown-style formatting
      let processedParagraph = trimmedParagraph;
      
      // Convert **bold** to <strong>
      processedParagraph = processedParagraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Convert *italic* to <em>
      processedParagraph = processedParagraph.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Convert `code` to <code>
      processedParagraph = processedParagraph.replace(/`(.*?)`/g, '<code>$1</code>');
      
      htmlContent += `<p>${processedParagraph}</p>`;
    }
  });
  
  return htmlContent;
}

// Save data to files (will work in development, but not in Vercel production)
function saveData() {
  try {
    console.log('💾 Attempting to save data...');
    
    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Save works data
    fs.writeFileSync(DATA_FILE, JSON.stringify(dynamicWorks, null, 2));
    console.log(`✅ Saved ${dynamicWorks.length} works to ${DATA_FILE}`);
    
    // Save work details data
    fs.writeFileSync(DETAILS_FILE, JSON.stringify(dynamicWorkDetails, null, 2));
    console.log(`✅ Saved ${Object.keys(dynamicWorkDetails).length} work details to ${DETAILS_FILE}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error saving data (this is expected in Vercel production):', error.message);
    return false;
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
      seo: {
        metaTitle: "About - Mithun Raj | Frontend Developer & Digital Designer",
        metaDescription: "Learn more about Mithun Raj, a passionate Frontend Developer and Digital Designer with 3+ years of experience in web development, React, Next.js, and modern technologies.",
        metaKeywords: "about mithun raj, frontend developer, web developer, react developer, digital designer, career, experience, skills, portfolio",
        metaImage: {
          url: "/images/about-me.png",
          alt: "Mithun Raj - About Me"
        },
        metaUrl: "https://mithun-three.vercel.app/about",
        metaType: "website",
        metaAuthor: "Mithun Raj",
        metaRobots: "index, follow",
        metaViewport: "width=device-width, initial-scale=1.0",
        metaCharset: "UTF-8",
        metaLanguage: "en",
        metaThemeColor: "#000000",
        twitterCard: "summary_large_image",
        twitterSite: "@mithunraj",
        twitterCreator: "@mithunraj",
        openGraphTitle: "About - Mithun Raj | Frontend Developer & Digital Designer",
        openGraphDescription: "Learn more about Mithun Raj, a passionate Frontend Developer and Digital Designer with 3+ years of experience.",
        openGraphImage: "/images/about-me.png",
        openGraphUrl: "https://mithun-three.vercel.app/about",
        openGraphType: "website",
        openGraphSiteName: "Mithun Raj Portfolio"
      },
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
        metaTitle: "Contact - Mithun Raj | Get In Touch for Web Development Projects",
        metaDescription: "Get in touch with Mithun Raj for web development projects, consulting, design, and development services. Available for freelance work and collaboration opportunities.",
        metaKeywords: "contact mithun raj, hire frontend developer, web development services, freelance developer, react developer, consulting, collaboration",
        metaImage: {
          url: "/images/contact-banner.jpg",
          alt: "Contact Mithun Raj - Frontend Developer"
        },
        metaUrl: "https://mithun-three.vercel.app/contact",
        metaType: "website",
        metaAuthor: "Mithun Raj",
        metaRobots: "index, follow",
        metaViewport: "width=device-width, initial-scale=1.0",
        metaCharset: "UTF-8",
        metaLanguage: "en",
        metaThemeColor: "#000000",
        twitterCard: "summary_large_image",
        twitterSite: "@mithunraj",
        twitterCreator: "@mithunraj",
        openGraphTitle: "Contact - Mithun Raj | Get In Touch for Web Development Projects",
        openGraphDescription: "Get in touch with Mithun Raj for web development projects, consulting, design, and development services.",
        openGraphImage: "/images/contact-banner.jpg",
        openGraphUrl: "https://mithun-three.vercel.app/contact",
        openGraphType: "website",
        openGraphSiteName: "Mithun Raj Portfolio"
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
        metaTitle: "Mithun Raj - Frontend Developer & Digital Designer",
        metaDescription: "Frontend Developer and Digital Designer building scalable, accessible, and technically tuned brands on the web. Specializing in React, Next.js, and modern web technologies.",
        metaKeywords: "frontend developer, web developer, react developer, next.js, digital designer, portfolio, web development, UI/UX, JavaScript, TypeScript",
        metaImage: {
          url: "/images/portfolio-banner.jpg",
          alt: "Mithun Raj - Frontend Developer Portfolio"
        },
        metaUrl: "https://mithun-three.vercel.app",
        metaType: "website",
        metaAuthor: "Mithun Raj",
        metaRobots: "index, follow",
        metaViewport: "width=device-width, initial-scale=1.0",
        metaCharset: "UTF-8",
        metaLanguage: "en",
        metaThemeColor: "#000000",
        twitterCard: "summary_large_image",
        twitterSite: "@mithunraj",
        twitterCreator: "@mithunraj",
        openGraphTitle: "Mithun Raj - Frontend Developer & Digital Designer",
        openGraphDescription: "Frontend Developer and Digital Designer building scalable, accessible, and technically tuned brands on the web.",
        openGraphImage: "/images/portfolio-banner.jpg",
        openGraphUrl: "https://mithun-three.vercel.app",
        openGraphType: "website",
        openGraphSiteName: "Mithun Raj Portfolio"
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
        metaTitle: "Works & Projects - Mithun Raj Portfolio",
        metaDescription: "Explore my portfolio of web development projects, digital design work, and technical solutions. View case studies, technologies used, and project outcomes.",
        metaKeywords: "portfolio projects, web development projects, case studies, react projects, next.js projects, digital design, web applications",
        metaImage: {
          url: "/images/works-banner.jpg",
          alt: "Mithun Raj - Portfolio Works and Projects"
        },
        metaUrl: "https://mithun-three.vercel.app/works",
        metaType: "website",
        metaAuthor: "Mithun Raj",
        metaRobots: "index, follow",
        metaViewport: "width=device-width, initial-scale=1.0",
        metaCharset: "UTF-8",
        metaLanguage: "en",
        metaThemeColor: "#000000",
        twitterCard: "summary_large_image",
        twitterSite: "@mithunraj",
        twitterCreator: "@mithunraj",
        openGraphTitle: "Works & Projects - Mithun Raj Portfolio",
        openGraphDescription: "Explore my portfolio of web development projects, digital design work, and technical solutions.",
        openGraphImage: "/images/works-banner.jpg",
        openGraphUrl: "https://mithun-three.vercel.app/works",
        openGraphType: "website",
        openGraphSiteName: "Mithun Raj Portfolio"
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
        metaTitle: `${req.body.title} - Project Details | Mithun Raj Portfolio`,
        metaDescription: req.body.description || `Detailed project information for ${req.body.title}. View technologies used, challenges solved, and project outcomes.`,
        metaKeywords: `${req.body.title.toLowerCase()}, project details, case study, web development, ${req.body.category?.toLowerCase() || 'web application'}, portfolio project`,
        metaImage: {
          url: req.body.image || "/images/works/default.png",
          alt: `${req.body.title} - Project Screenshot`
        },
        metaUrl: `https://mithun-three.vercel.app/work/${slug}`,
        metaType: "article",
        metaAuthor: "Mithun Raj",
        metaRobots: "index, follow",
        metaViewport: "width=device-width, initial-scale=1.0",
        metaCharset: "UTF-8",
        metaLanguage: "en",
        metaThemeColor: "#000000",
        twitterCard: "summary_large_image",
        twitterSite: "@mithunraj",
        twitterCreator: "@mithunraj",
        openGraphTitle: `${req.body.title} - Project Details | Mithun Raj Portfolio`,
        openGraphDescription: req.body.description || `Detailed project information for ${req.body.title}.`,
        openGraphImage: req.body.image || "/images/works/default.png",
        openGraphUrl: `https://mithun-three.vercel.app/work/${slug}`,
        openGraphType: "article",
        openGraphSiteName: "Mithun Raj Portfolio"
      },
      slug: slug,
      widgets: [
        {
          widget_type: "WorkDetailBanner",
          data: {
            title: req.body.title,
            description: req.body.description || "",
            longDescription: req.body.longDescription || "",
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
  
  // Try to save data (will work in development, not in Vercel production)
  const saved = saveData();
  
  res.json({
    ...newWork,
    saved: saved,
    message: saved ? 'Work saved successfully' : 'Work added to memory (will be lost on restart)'
  });
});

app.put('/api/admin/works/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dynamicWorks.findIndex(work => work.id === id);
  if (index !== -1) {
    console.log('🔄 Updating work with ID:', id);
    console.log('📝 Request body longDescription length:', req.body.longDescription ? req.body.longDescription.length : 'undefined');
    console.log('📝 Original work longDescription length:', dynamicWorks[index].longDescription ? dynamicWorks[index].longDescription.length : 'undefined');
    
    // Update the work in the array
    dynamicWorks[index] = { ...dynamicWorks[index], ...req.body };
    
    console.log('✅ Updated work longDescription length:', dynamicWorks[index].longDescription ? dynamicWorks[index].longDescription.length : 'undefined');
    
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
          metaTitle: `${req.body.title || dynamicWorks[index].title} - Project Details | Mithun Raj Portfolio`,
          metaDescription: req.body.description || `Detailed project information for ${req.body.title || dynamicWorks[index].title}. View technologies used, challenges solved, and project outcomes.`,
          metaKeywords: `${(req.body.title || dynamicWorks[index].title).toLowerCase()}, project details, case study, web development, ${(req.body.category || dynamicWorks[index].category || 'web application').toLowerCase()}, portfolio project`,
          metaImage: {
            url: req.body.image || dynamicWorks[index].image || "/images/works/default.png",
            alt: `${req.body.title || dynamicWorks[index].title} - Project Screenshot`
          },
          metaUrl: `https://mithun-three.vercel.app/work/${slug}`,
          metaType: "article",
          metaAuthor: "Mithun Raj",
          metaRobots: "index, follow",
          metaViewport: "width=device-width, initial-scale=1.0",
          metaCharset: "UTF-8",
          metaLanguage: "en",
          metaThemeColor: "#000000",
          twitterCard: "summary_large_image",
          twitterSite: "@mithunraj",
          twitterCreator: "@mithunraj",
          openGraphTitle: `${req.body.title || dynamicWorks[index].title} - Project Details | Mithun Raj Portfolio`,
          openGraphDescription: req.body.description || `Detailed project information for ${req.body.title || dynamicWorks[index].title}.`,
          openGraphImage: req.body.image || dynamicWorks[index].image || "/images/works/default.png",
          openGraphUrl: `https://mithun-three.vercel.app/work/${slug}`,
          openGraphType: "article",
          openGraphSiteName: "Mithun Raj Portfolio"
        },
        slug: slug,
        widgets: [
          {
            widget_type: "WorkDetailBanner",
            data: {
              title: req.body.title || dynamicWorks[index].title,
              description: req.body.description || "",
              longDescription: req.body.longDescription || "",
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
    
    // Try to save data
    const saved = saveData();
    
    res.json({
      ...dynamicWorks[index],
      saved: saved,
      message: saved ? 'Work updated and saved successfully' : 'Work updated in memory (will be lost on restart)'
    });
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
    
    // Try to save data
    const saved = saveData();
    
    res.json({
      ...deletedWork,
      saved: saved,
      message: saved ? 'Work deleted and saved successfully' : 'Work deleted from memory (will be lost on restart)'
    });
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

// Start the server if this file is run directly (not as a module)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio API server running on port ${PORT}`);
    console.log(`📊 Loaded ${dynamicWorks.length} works from database`);
    console.log(`🔗 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`🌐 API base: http://localhost:${PORT}/api`);
  });
}
