# Portfolio API with GitHub-as-Database

A dynamic portfolio API that uses GitHub as a database for persistent data storage. Works are stored in JSON files in the repository and persist across deployments.

## 🚀 Features

- **Dynamic Work Management**: Add, edit, and delete works through admin panel
- **GitHub-as-Database**: Data stored in JSON files in the repository
- **Persistent Storage**: Works survive server restarts and deployments
- **Admin Interface**: Web-based GUI for managing portfolio works
- **Vercel Deployment**: Optimized for serverless deployment

## 📁 Project Structure

```
portfolio-api/
├── api/
│   └── index.js              # Main serverless function
├── data/
│   ├── works.json            # All works data
│   └── work-details.json     # Work detail pages
├── public/
│   └── admin.html            # Admin interface
├── scripts/
│   └── commit-data.js        # Data commit script
├── package.json
├── vercel.json
└── README.md
```

## 🛠️ Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## 📊 Data Storage System

### How It Works

1. **Local Development**: Data is saved to JSON files in the `data/` directory
2. **Vercel Production**: Data is loaded from JSON files but cannot be written (read-only filesystem)
3. **Persistence**: Data persists through Git commits and deployments

### Data Files

- **`data/works.json`**: Array of all works
- **`data/work-details.json`**: Object with work detail pages keyed by slug

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/homepage` - Homepage data with featured works
- `GET /api/works` - All works listing
- `GET /api/work/:slug` - Individual work detail page
- `GET /api/about` - About page data
- `GET /api/contact` - Contact page data

### Admin Endpoints
- `GET /api/admin/works` - List all works
- `GET /api/admin/works/:id` - Get specific work
- `POST /api/admin/works` - Create new work
- `PUT /api/admin/works/:id` - Update work
- `DELETE /api/admin/works/:id` - Delete work

### Admin Interface
- `GET /admin` - Web-based admin panel

## 💾 Data Persistence Workflow

### Adding Works (Development)
1. Go to `/admin` in your browser
2. Fill out the work form
3. Submit - data is automatically saved to JSON files
4. Run `npm run commit-data` to commit to GitHub

### Adding Works (Production)
1. Go to `/admin` in your browser
2. Fill out the work form
3. Submit - data is stored in memory temporarily
4. **Important**: Run `npm run commit-data` locally to save permanently

### Manual Data Commit
```bash
# Check for changes
git status

# Add data files
git add data/works.json data/work-details.json

# Commit
git commit -m "Update portfolio data"

# Push to GitHub
git push
```

## 🎯 Admin Panel Features

### Work Fields
- **Title**: Work title
- **Slug**: URL-friendly identifier (auto-generated if empty)
- **Category**: Work category
- **Date**: Completion date
- **Image**: Main image URL/path
- **Description**: Short description
- **Long Description**: Detailed project description
- **Live URL**: Link to live project
- **GitHub URL**: Link to source code
- **Featured**: Mark as featured work

### Advanced Fields
- **Tech Stack**: Array of technologies with icons
- **Challenges**: Technical challenges faced
- **Solutions**: How challenges were solved
- **Results**: Project outcomes
- **Gallery**: Multiple project images

## 🔄 Data Synchronization

### Development Environment
- ✅ **Auto-save**: Data automatically saved to files
- ✅ **Immediate persistence**: Changes saved instantly
- ✅ **Git integration**: Easy to commit changes

### Production Environment (Vercel)
- ⚠️ **Memory-only**: Data stored in memory during function execution
- ⚠️ **Temporary**: Data lost on server restart
- ✅ **Load from files**: Data loaded from committed JSON files
- ✅ **Manual commit**: Use `npm run commit-data` to save changes

## 📝 Usage Examples

### Create a New Work
1. Visit `/admin`
2. Fill out the form with:
   - Title: "My Amazing Project"
   - Slug: "my-amazing-project"
   - Category: "Web Application"
   - Tech Stack: React, Node.js, MongoDB
   - Challenges: "Complex state management"
   - Solutions: "Used Redux for state management"
   - Results: "Improved performance by 50%"
3. Submit the form
4. Run `npm run commit-data` to save permanently

### Edit Existing Work
1. Visit `/admin`
2. Click "Edit" on any work
3. Modify the fields
4. Submit changes
5. Run `npm run commit-data` to save permanently

## 🚨 Important Notes

### Vercel Limitations
- **Read-only filesystem**: Cannot write files in production
- **Cold starts**: Data resets on function restart
- **Memory-only**: Production data is temporary

### Best Practices
1. **Always commit data**: Run `npm run commit-data` after changes
2. **Test locally**: Use `npm run dev` for development
3. **Backup data**: Keep local copies of important data
4. **Version control**: All data changes are tracked in Git

## 🔧 Troubleshooting

### Data Not Persisting
- Check if you ran `npm run commit-data`
- Verify data files are committed to Git
- Check Vercel deployment logs

### Admin Panel Not Working
- Ensure all dependencies are installed
- Check browser console for errors
- Verify API endpoints are accessible

### API Errors
- Check Vercel function logs
- Verify JSON file syntax
- Ensure all required fields are provided

## 📈 Future Improvements

- [ ] Database integration (MongoDB, Supabase)
- [ ] Image upload functionality
- [ ] User authentication for admin
- [ ] API rate limiting
- [ ] Data validation middleware
- [ ] Backup/restore functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Commit and push
6. Create a pull request

## 📄 License

MIT License - feel free to use this project for your own portfolio!
