const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'portfolio.db');

// Initialize database
function initDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Create tables
      db.serialize(() => {
        // Works table
        db.run(`CREATE TABLE IF NOT EXISTS works (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          date TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL,
          longDescription TEXT,
          image TEXT NOT NULL,
          gallery TEXT,
          techStack TEXT,
          features TEXT,
          liveUrl TEXT,
          githubUrl TEXT,
          challenges TEXT,
          solutions TEXT,
          featured BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Homepage data table
        db.run(`CREATE TABLE IF NOT EXISTS homepage (
          id INTEGER PRIMARY KEY,
          seo_metaTitle TEXT,
          seo_metaDescription TEXT,
          seo_metaImage TEXT,
          banner_title TEXT,
          about_title TEXT,
          about_description TEXT,
          about_link_text TEXT,
          about_link_url TEXT,
          principles_title TEXT,
          principles_main_title TEXT,
          services_title TEXT,
          services_main_title TEXT
        )`);

        // About page data table
        db.run(`CREATE TABLE IF NOT EXISTS about (
          id INTEGER PRIMARY KEY,
          banner_title TEXT,
          banner_image TEXT,
          banner_description TEXT,
          journey_title TEXT,
          skills_title TEXT,
          services_title TEXT,
          services_main_title TEXT
        )`);

        // Contact data table
        db.run(`CREATE TABLE IF NOT EXISTS contact (
          id INTEGER PRIMARY KEY,
          title TEXT,
          mobile TEXT,
          email TEXT
        )`);

        // Insert default data
        insertDefaultData(db).then(() => {
          resolve(db);
        }).catch(reject);
      });
    });
  });
}

// Insert default data
async function insertDefaultData(db) {
  return new Promise((resolve, reject) => {
    // Check if homepage data exists
    db.get("SELECT COUNT(*) as count FROM homepage", (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (row.count === 0) {
        // Insert default homepage data
        db.run(`INSERT INTO homepage (
          id, seo_metaTitle, seo_metaDescription, banner_title, 
          about_title, about_description, about_link_text, about_link_url,
          principles_title, principles_main_title, services_title, services_main_title
        ) VALUES (1, 'Mithun raj', 'This is my personal portfolio site', 'FRONTEND DEVELOPER',
        'MITHUN RAJ', 'I''m a lead WebApp Developer and Digital Designer building scalable, accessible, and technically tuned brands on the web.',
        'ABOUT ME', '/about', 'PRINCIPLES', '<span>DESIGN MEETS</span><span> DEVELOPMENT</span>',
        'SERVICES', 'HIRE ME')`);
      }
      
      // Check if about data exists
      db.get("SELECT COUNT(*) as count FROM about", (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (row.count === 0) {
          // Insert default about data
          db.run(`INSERT INTO about (
            id, banner_title, banner_image, banner_description, journey_title, skills_title, services_title, services_main_title
          ) VALUES (1, 'CREATIVE MEETS TECHNICAL', '/images/about-me.png', 
          'I''m a midwest family man with a love for design and front-end development. I have a deep desire to consistently learn from others and fuel my skills to design timeless brands, then develop them into reality with code.',
          'CAREER', 'TECH STACK', 'SERVICES', 'HIRE ME')`);
        }
        
        // Check if contact data exists
        db.get("SELECT COUNT(*) as count FROM contact", (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          
          if (row.count === 0) {
            // Insert default contact data
            db.run(`INSERT INTO contact (id, title, mobile, email) 
            VALUES (1, 'Lets''s build something great togather', '+91 7907348596', 'mithunmacsafe@gmail.com')`);
          }
          
          resolve();
        });
      });
    });
  });
}

// Get homepage data
function getHomepage() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.get("SELECT * FROM homepage WHERE id = 1", (err, homepage) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Get featured works (limit 4)
      db.all("SELECT * FROM works WHERE featured = 1 ORDER BY createdAt DESC LIMIT 4", (err, works) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Get principles
        const principles = [
          {
            title: "Systems-first",
            description: "Building systems for anything from design and development, to scoping and documentation is at the core of my process to driving results for every project I work on."
          },
          {
            title: "Accessibility and Usability",
            description: "Accessibility and usability are two important principles of front-end development that aim to make a website or web application easy to use and understand for all users, regardless of their abilities, preferences, or devices"
          },
          {
            title: "Performance and Optimization",
            description: "Performance and optimization are two related principles of front-end development that aim to make a website or web application fast and reliable for users."
          },
          {
            title: "Responsiveness and Cross-Browser Compatibility",
            description: "Responsiveness and cross-browser compatibility are two essential principles of front-end development that aim to make a website or web application adaptable and consistent across different devices and browsers"
          },
          {
            title: "Testing and Debugging",
            description: "Testing and debugging are essential for web development, as they prevent problems, improve user experience, increase trust and ensure the quality."
          }
        ];
        
        // Get services
        const services = [
          {
            title: "Consulting",
            description: "Agencies and in-house teams hire me to be embedded on their team for direct support on strategy, scoping, custom code, and training."
          },
          {
            title: "Design",
            description: "From strategy and brand, to web and product design, I help teams bring businesses to life with modern, memorable and minimal creative work."
          },
          {
            title: "Development",
            description: "With 3+ years creating for the web, I can join your upcoming project to lead development in a design-first, systematic way that will scale with your brand."
          }
        ];
        
        const result = {
          data: {
            seo: {
              id: 5,
              metaTitle: homepage.seo_metaTitle,
              metaDescription: homepage.seo_metaDescription,
              metaOgImage: "",
              keywords: null,
              metaRobots: null,
              structuredData: null,
              metaViewport: null,
              canonicalURL: null,
              metaImage: {
                url: {
                  alternativeText: null
                },
                alternativeText: null
              },
              metaSocial: []
            },
            widgets: [
              {
                widget_type: "HomeBanner",
                data: {
                  title: homepage.banner_title
                }
              },
              {
                widget_type: "HomeAbout",
                data: {
                  title: homepage.about_title,
                  description: homepage.about_description,
                  link: {
                    text: homepage.about_link_text,
                    url: homepage.about_link_url
                  },
                  stack_title: "SERVICE TYPE",
                  stack: [
                    {
                      title: "Web Application",
                      link: {
                        text: "KNOW MORE",
                        url: "/"
                      }
                    },
                    {
                      title: "Progressive Web Application",
                      link: {
                        text: "KNOW MORE",
                        url: "/"
                      }
                    },
                    {
                      title: "Decentralized applications",
                      link: {
                        text: "KNOW MORE",
                        url: "/"
                      }
                    }
                  ]
                }
              },
              {
                widget_type: "HomeWorks",
                data: {
                  title: "FEATURED WORK",
                  works: works.map(work => ({
                    date: work.date,
                    title: work.title,
                    image: work.image,
                    stack: work.category,
                    url: `works/${work.title.toLowerCase().replace(/\s+/g, '-')}`
                  }))
                }
              },
              {
                widget_type: "HomePrinciples",
                data: {
                  title: homepage.principles_title,
                  main_title: homepage.principles_main_title,
                  principles: principles
                }
              },
              {
                widget_type: "HomeHire",
                data: {
                  title: homepage.services_title,
                  main_title: homepage.services_main_title,
                  services: services
                }
              }
            ]
          }
        };
        
        db.close();
        resolve(result);
      });
    });
  });
}

// Get about page data
function getAbout() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.get("SELECT * FROM about WHERE id = 1", (err, about) => {
      if (err) {
        reject(err);
        return;
      }
      
      const career = [
        {
          start_date: "2024",
          end_date: "2025",
          experince: "7 month",
          designation: "Frontend Developer",
          company_name: "Nuox technologies",
          url: ""
        },
        {
          start_date: "2022",
          end_date: "2024",
          experince: "2.5 year",
          designation: "UI Developer",
          company_name: "Webandcrafts",
          url: ""
        },
        {
          start_date: "2021",
          end_date: "2022",
          experince: "1 year",
          designation: "Python Fullstack Developer",
          company_name: "Right Soft Options",
          url: ""
        }
      ];
      
      const skills = [
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
      ];
      
      const services = [
        {
          title: "Consulting",
          description: "Agencies and in-house teams hire me to be embedded on their team for direct support on strategy, scoping, custom code, and training."
        },
        {
          title: "Design",
          description: "From strategy and brand, to web and product design, I help teams bring businesses to life with modern, memorable and minimal creative work."
        },
        {
          title: "Development",
          description: "With 3+ years creating for the web, I can join your upcoming project to lead development in a design-first, systematic way that will scale with your brand."
        }
      ];
      
      const result = {
        data: {
          widgets: [
            {
              widget_type: "AboutBanner",
              data: {
                title: about.banner_title,
                image: about.banner_image,
                description: about.banner_description
              }
            },
            {
              widget_type: "AboutJourney",
              data: {
                title: about.journey_title,
                career: career
              }
            },
            {
              widget_type: "AboutSkills",
              data: {
                title: about.skills_title,
                skills: skills
              }
            },
            {
              widget_type: "HomeHire",
              data: {
                title: about.services_title,
                main_title: about.services_main_title,
                services: services
              }
            }
          ]
        }
      };
      
      db.close();
      resolve(result);
    });
  });
}

// Get all works
function getWorks() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.all("SELECT * FROM works ORDER BY createdAt DESC", (err, works) => {
      if (err) {
        reject(err);
        return;
      }
      
      const categories = [
        { value: "all", label: "All" },
        { value: "web-application", label: "Web Application" },
        { value: "e-commerce", label: "E-commerce" },
        { value: "management-system", label: "Management System" },
        { value: "education", label: "Education" }
      ];
      
      const result = {
        data: {
          widgets: [
            {
              widget_type: "WorkList",
              data: {
                title: "Works",
                description: "A collection of some of my favorite Digital Design and Development projects from the past few years. 🤓",
                category: categories,
                works: works.map(work => ({
                  date: work.date,
                  title: work.title,
                  image: work.image,
                  stack: work.category,
                  url: `works/${work.title.toLowerCase().replace(/\s+/g, '-')}`
                }))
              }
            }
          ]
        }
      };
      
      db.close();
      resolve(result);
    });
  });
}

// Get single work
function getWork(slug) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.get("SELECT * FROM works WHERE LOWER(REPLACE(title, ' ', '-')) = ?", [slug], (err, work) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!work) {
        db.close();
        reject(new Error('Work not found'));
        return;
      }
      
      const techStack = JSON.parse(work.techStack || '[]');
      const features = JSON.parse(work.features || '[]');
      const gallery = JSON.parse(work.gallery || '[]');
      
      const result = {
        data: {
          seo: {
            metaTitle: `${work.title} - Project Details`,
            metaDescription: work.description,
            metaImage: {
              url: work.image
            }
          },
          widgets: [
            {
              widget_type: "WorkDetail",
              data: {
                title: work.title,
                date: work.date,
                category: work.category,
                description: work.description,
                longDescription: work.longDescription,
                image: work.image,
                gallery: gallery,
                techStack: techStack,
                features: features,
                links: {
                  live: work.liveUrl,
                  github: work.githubUrl
                },
                challenges: work.challenges,
                solutions: work.solutions
              }
            }
          ]
        }
      };
      
      db.close();
      resolve(result);
    });
  });
}

// Get contact data
function getContact() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.get("SELECT * FROM contact WHERE id = 1", (err, contact) => {
      if (err) {
        reject(err);
        return;
      }
      
      const result = {
        data: {
          widgets: [
            {
              widget_type: "ContactUs",
              data: {
                title: contact.title,
                mobile: contact.mobile,
                email: contact.email
              }
            }
          ]
        }
      };
      
      db.close();
      resolve(result);
    });
  });
}

// Add new work
function addWork(workData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    const {
      title, date, category, description, longDescription, image, gallery,
      techStack, features, liveUrl, githubUrl, challenges, solutions, featured
    } = workData;
    
    db.run(`INSERT INTO works (
      title, date, category, description, longDescription, image, gallery,
      techStack, features, liveUrl, githubUrl, challenges, solutions, featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, date, category, description, longDescription, image,
      JSON.stringify(gallery), JSON.stringify(techStack), JSON.stringify(features),
      liveUrl, githubUrl, challenges, solutions, featured ? 1 : 0
    ], function(err) {
      if (err) {
        reject(err);
        return;
      }
      
      db.close();
      resolve({ id: this.lastID });
    });
  });
}

// Update work
function updateWork(id, workData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    const {
      title, date, category, description, longDescription, image, gallery,
      techStack, features, liveUrl, githubUrl, challenges, solutions, featured
    } = workData;
    
    db.run(`UPDATE works SET 
      title = ?, date = ?, category = ?, description = ?, longDescription = ?,
      image = ?, gallery = ?, techStack = ?, features = ?, liveUrl = ?,
      githubUrl = ?, challenges = ?, solutions = ?, featured = ?
      WHERE id = ?`,
    [
      title, date, category, description, longDescription, image,
      JSON.stringify(gallery), JSON.stringify(techStack), JSON.stringify(features),
      liveUrl, githubUrl, challenges, solutions, featured ? 1 : 0, id
    ], function(err) {
      if (err) {
        reject(err);
        return;
      }
      
      db.close();
      resolve({ changes: this.changes });
    });
  });
}

// Delete work
function deleteWork(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.run("DELETE FROM works WHERE id = ?", [id], function(err) {
      if (err) {
        reject(err);
        return;
      }
      
      db.close();
      resolve({ changes: this.changes });
    });
  });
}

// Get all works for admin
function getAllWorks() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    db.all("SELECT * FROM works ORDER BY createdAt DESC", (err, works) => {
      if (err) {
        reject(err);
        return;
      }
      
      db.close();
      resolve(works);
    });
  });
}

module.exports = {
  initDatabase,
  getHomepage,
  getAbout,
  getWorks,
  getWork,
  getContact,
  addWork,
  updateWork,
  deleteWork,
  getAllWorks
};
