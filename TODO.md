# TODO: Minimalist Full-Stack Blogging System

## Project Structure
```
blogging-system/
├── server/                 # Backend (Express.js + MongoDB)
│   ├── models/            # Mongoose models
│   │   ├── User.js        # User schema
│   │   └── Post.js        # Post schema
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   └── posts.js       # CRUD operations for posts
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # JWT verification
│   ├── .env              # Environment variables (template)
│   ├── server.js         # Main server file
│   └── package.json      # Dependencies
├── client/                # Frontend (Vanilla HTML/CSS/JS)
│   ├── css/
│   │   └── style.css     # Minimalist styling
│   ├── js/
│   │   ├── app.js        # Main application logic
│   │   ├── auth.js       # Authentication handling
│   │   └── api.js        # API calls
│   ├── index.html        # Home page (list posts)
│   ├── post.html         # Single post view
│   ├── login.html        # Login page
│   ├── signup.html       # Signup page
│   └── dashboard.html    # User dashboard (manage posts)
└── README.md             # Documentation
```

## Tasks

### Phase 1: Backend Setup
- [x] Create server package.json with dependencies
- [x] Create MongoDB connection configuration
- [x] Create User model with authentication methods
- [x] Create Post model with relationships
- [x] Create JWT authentication middleware
- [x] Create authentication routes (signup, login)
- [x] Create CRUD routes for posts
- [x] Create main server entry point
- [x] Create .env template

### Phase 2: Frontend Setup
- [x] Create client folder structure
- [x] Create CSS with minimalist design
- [x] Create API utility functions
- [x] Create authentication handling module
- [x] Create main application logic
- [x] Create index.html (home page)
- [x] Create post.html (single post view)
- [x] Create login.html
- [x] Create signup.html
- [x] Create dashboard.html

### Phase 3: Documentation & Deployment
- [x] Create README.md with setup instructions
- [x] Document environment variables needed
- [x] Add deployment guide
- [ ] Test the complete system

## Environment Variables Needed
- MONGODB_URI: MongoDB Atlas connection string
- JWT_SECRET: Secret key for JWT tokens
- PORT: Server port (default: 3000)
- CLIENT_URL: Frontend URL (for CORS)

