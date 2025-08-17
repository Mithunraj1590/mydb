# Portfolio API with SQLite Database

A modern portfolio API built with Express.js and SQLite, featuring a beautiful admin interface for managing portfolio works.

## 🚀 Features

- **SQLite Database**: Persistent data storage with automatic initialization
- **Same API Structure**: Maintains the exact same API response format as the original `db.json`
- **Admin GUI**: Beautiful web interface for managing portfolio works
- **Featured Works**: Mark works as featured to display on homepage (max 4)
- **Vercel Ready**: Optimized for serverless deployment on Vercel
- **CORS Enabled**: Ready for frontend integration

## 📁 Project Structure

```
mydb/
├── server.js          # Main Express server
├── database.js        # SQLite database operations
├── seed.js           # Database seeding script
├── package.json      # Dependencies and scripts
├── vercel.json       # Vercel deployment config
├── public/
│   └── admin.html    # Admin interface
└── portfolio.db      # SQLite database (auto-generated)
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Public API (Same structure as original db.json)

- `GET /api/homepage` - Homepage data with featured works (max 4)
- `GET /api/about` - About page data
- `GET /api/works` - All works for works page
- `GET /api/works/:slug` - Individual work details
- `GET /api/contact` - Contact information

### Admin API

- `GET /api/admin/works` - Get all works for admin
- `POST /api/admin/works` - Add new work
- `PUT /api/admin/works/:id` - Update work
- `DELETE /api/admin/works/:id` - Delete work

### Admin Interface

- `GET /admin` - Web-based admin interface

## 🎨 Admin Interface

Access the admin interface at `/admin` to:

- **View all works** in a beautiful table format
- **Add new works** with a comprehensive form
- **Edit existing works** with pre-filled data
- **Delete works** with confirmation
- **Mark works as featured** for homepage display
- **Real-time statistics** (total works, featured works, API status)

## 📊 Database Schema

### Works Table
```sql
CREATE TABLE works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  longDescription TEXT,
  image TEXT NOT NULL,
  gallery TEXT,           -- JSON array
  techStack TEXT,         -- JSON array
  features TEXT,          -- JSON array
  liveUrl TEXT,
  githubUrl TEXT,
  challenges TEXT,
  solutions TEXT,
  featured BOOLEAN DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)

### Vercel Deployment
The project is configured for Vercel deployment with:
- Serverless function optimization
- Proper routing configuration
- Static file serving

## 📝 Usage Examples

### Adding a New Work via API
```javascript
const response = await fetch('/api/admin/works', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "My New Project",
    date: "2024",
    category: "Web Application",
    description: "A brief description",
    longDescription: "A detailed description",
    image: "/images/works/project.png",
    gallery: JSON.stringify(["/image1.jpg", "/image2.jpg"]),
    techStack: JSON.stringify([
      { name: "React", icon: "/icons/react.svg" }
    ]),
    features: JSON.stringify(["Feature 1", "Feature 2"]),
    liveUrl: "https://project.com",
    githubUrl: "https://github.com/user/project",
    challenges: "Project challenges",
    solutions: "Project solutions",
    featured: true
  })
});
```

### Fetching Homepage Data
```javascript
const response = await fetch('/api/homepage');
const data = await response.json();
// Returns the same structure as original db.json
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

The API will be available at your Vercel domain with the same endpoints.

## 🔄 Migration from db.json

The API maintains 100% compatibility with your existing frontend code. The response structure is identical to the original `db.json` format.

## 📱 Features

- **Responsive Design**: Admin interface works on all devices
- **Real-time Updates**: Changes reflect immediately
- **Form Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages
- **Search & Filter**: Easy work management
- **Image Preview**: Visual work representation

## 🎯 Key Benefits

1. **Scalable**: SQLite database can handle thousands of works
2. **Maintainable**: Clean code structure with separation of concerns
3. **User-Friendly**: Beautiful admin interface for non-technical users
4. **Performance**: Optimized queries and caching
5. **Secure**: Input validation and sanitization
6. **Flexible**: Easy to extend with new features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
