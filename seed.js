const db = require('./database');

async function seedDatabase() {
  try {
    await db.initDatabase();
    
    // Sample works data
    const sampleWorks = [
      {
        title: "Worktowander Dashboard",
        date: "2025",
        category: "Web Application",
        description: "A comprehensive admin dashboard for managing work and travel bookings. Features include user management, booking system, analytics dashboard, and real-time notifications.",
        longDescription: "Worktowander Dashboard is a full-featured administrative interface designed to streamline the management of work and travel bookings. The platform provides an intuitive user experience with advanced filtering, search capabilities, and comprehensive reporting tools. Built with modern web technologies, it ensures fast performance and responsive design across all devices.",
        image: "/images/works/work1.png",
        gallery: JSON.stringify([
          "/images/works/work1.png",
          "/images/works/work1-detail1.png",
          "/images/works/work1-detail2.png"
        ]),
        techStack: JSON.stringify([
          {
            name: "Next.js",
            icon: "/images/skills/Nextjs_logo.svg"
          },
          {
            name: "React",
            icon: "/images/skills/React_logo.svg"
          },
          {
            name: "TypeScript",
            icon: "/images/skills/Typescript_logo.svg"
          },
          {
            name: "Tailwind CSS",
            icon: "/images/skills/Tailwind_logo.svg"
          }
        ]),
        features: JSON.stringify([
          "User Authentication & Authorization",
          "Dashboard Analytics",
          "Booking Management System",
          "Real-time Notifications",
          "Responsive Design",
          "Admin Panel"
        ]),
        liveUrl: "https://worktowander.vercel.app/admin/dashboard",
        githubUrl: "https://github.com/yourusername/worktowander-dashboard",
        challenges: "Implementing real-time notifications and ensuring optimal performance with large datasets were the main challenges. Solved using WebSocket connections and efficient data caching strategies.",
        solutions: "Utilized Next.js API routes for backend functionality, implemented Redis for caching, and used Socket.io for real-time features.",
        featured: true
      },
      {
        title: "Furniro",
        date: "2024",
        category: "E-commerce",
        description: "A modern furniture e-commerce platform with product catalog, shopping cart functionality, and user authentication system.",
        longDescription: "Furniro is a comprehensive e-commerce solution for furniture retail, featuring an intuitive product catalog with advanced filtering options, secure shopping cart functionality, and seamless user authentication. The platform provides a smooth shopping experience with responsive design and optimized performance for both desktop and mobile users.",
        image: "/images/works/work2.png",
        gallery: JSON.stringify([
          "/images/works/work2.png",
          "/images/works/work2-detail1.png",
          "/images/works/work2-detail2.png"
        ]),
        techStack: JSON.stringify([
          {
            name: "React",
            icon: "/images/skills/React_logo.svg"
          },
          {
            name: "JavaScript",
            icon: "/images/skills/Javascript_logo.svg"
          },
          {
            name: "CSS",
            icon: "/images/skills/cSS_logo.svg"
          },
          {
            name: "HTML5",
            icon: "/images/skills/Html5_logo.svg"
          }
        ]),
        features: JSON.stringify([
          "Product Catalog with Filtering",
          "Shopping Cart Management",
          "User Authentication",
          "Responsive Design",
          "Product Search",
          "Order Management"
        ]),
        liveUrl: "https://furniro-on3r.vercel.app/",
        githubUrl: "https://github.com/yourusername/furniro",
        challenges: "Creating an intuitive product filtering system and implementing a seamless shopping cart experience were key challenges. Solved through state management optimization and user experience design.",
        solutions: "Implemented React Context for state management, used localStorage for cart persistence, and created custom hooks for reusable functionality.",
        featured: true
      },
      {
        title: "University Library",
        date: "2023",
        category: "Management System",
        description: "A comprehensive library management system for universities with book catalog, member management, and borrowing operations.",
        longDescription: "The University Library Management System is a full-featured platform designed to streamline library operations in educational institutions. It includes comprehensive book catalog management, member registration and tracking, borrowing and return operations, and detailed reporting capabilities. The system ensures efficient library operations with user-friendly interfaces for both librarians and students.",
        image: "/images/works/work3.png",
        gallery: JSON.stringify([
          "/images/works/work3.png",
          "/images/works/work3-detail1.png",
          "/images/works/work3-detail2.png"
        ]),
        techStack: JSON.stringify([
          {
            name: "Next.js",
            icon: "/images/skills/Nextjs_logo.svg"
          },
          {
            name: "React",
            icon: "/images/skills/React_logo.svg"
          },
          {
            name: "TypeScript",
            icon: "/images/skills/Typescript_logo.svg"
          },
          {
            name: "Tailwind CSS",
            icon: "/images/skills/Tailwind_logo.svg"
          }
        ]),
        features: JSON.stringify([
          "Book Catalog Management",
          "Member Registration",
          "Borrowing & Return System",
          "Fine Calculation",
          "Search & Filter",
          "Admin Dashboard"
        ]),
        liveUrl: "https://university-library-frontend.vercel.app/sign-in",
        githubUrl: "https://github.com/yourusername/university-library",
        challenges: "Managing complex book borrowing logic and implementing fine calculation systems were challenging. Solved through robust database design and business logic implementation.",
        solutions: "Used Next.js API routes for backend operations, implemented proper authentication, and created comprehensive data validation systems.",
        featured: true
      },
      {
        title: "E-tutor",
        date: "2025",
        category: "Education",
        description: "An interactive online learning platform connecting students with tutors for personalized educational experiences.",
        longDescription: "E-Tutor is a comprehensive online learning platform that bridges the gap between students and qualified tutors. The platform features video conferencing capabilities, interactive whiteboards, progress tracking, and personalized learning paths. Built with modern web technologies, it provides a seamless educational experience with real-time collaboration tools and comprehensive assessment systems.",
        image: "/images/works/work4.png",
        gallery: JSON.stringify([
          "/images/works/work4.png",
          "/images/works/work4-detail1.png",
          "/images/works/work4-detail2.png"
        ]),
        techStack: JSON.stringify([
          {
            name: "Vue.js",
            icon: "/images/skills/Vuejs_logo.svg"
          },
          {
            name: "JavaScript",
            icon: "/images/skills/Javascript_logo.svg"
          },
          {
            name: "CSS",
            icon: "/images/skills/cSS_logo.svg"
          },
          {
            name: "HTML5",
            icon: "/images/skills/Html5_logo.svg"
          }
        ]),
        features: JSON.stringify([
          "Video Conferencing",
          "Interactive Whiteboard",
          "Progress Tracking",
          "Tutor Matching",
          "Payment Integration",
          "Mobile Responsive"
        ]),
        liveUrl: "https://mithun-etutor-frontend.vercel.app/",
        githubUrl: "https://github.com/yourusername/e-tutor",
        challenges: "Implementing real-time video conferencing and interactive whiteboard features were complex challenges. Solved using WebRTC technology and canvas-based drawing systems.",
        solutions: "Integrated WebRTC for video calls, used Socket.io for real-time communication, and implemented canvas API for interactive whiteboard functionality.",
        featured: true
      }
    ];

    // Add sample works
    for (const work of sampleWorks) {
      await db.addWork(work);
      console.log(`Added work: ${work.title}`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
