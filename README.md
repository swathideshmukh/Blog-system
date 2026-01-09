# 📝 Minimalist Full-Stack Blogging System

A clean, production-ready blogging platform built with Express.js, MongoDB, and vanilla JavaScript. Perfect for learning full-stack development with JWT authentication and CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)

## ✨ Features

### Authentication & User Management
- 🔐 User registration and login with JWT tokens
- 🔑 Secure password hashing with bcrypt
- 👤 User profile management

### Blog Posts (CRUD)
- 📝 Create, read, update, and delete posts
- ✏️ Users can only edit/delete their own posts
- 📖 Public access to view all posts
- 📄 Pagination-ready structure

### Comments System
- 💬 Registered users can comment on posts
- 🗑️ Delete own comments
- 👀 Public read access to comments

### Additional Features
- 🎨 Clean, minimalist UI design
- 📱 Fully responsive
- ⚡ Fast and lightweight (no heavy frameworks)
- 🔒 Protected API routes
- 🌍 Ready for deployment

## 📁 Project Structure

```
blogging-system/
├── server/                    # Backend API
│   ├── models/               # Mongoose schemas
│   │   ├── User.js           # User model
│   │   └── Post.js           # Post model with comments
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication endpoints
│   │   └── posts.js          # Post CRUD endpoints
│   ├── middleware/           # Custom middleware
│   │   └── auth.js           # JWT authentication
│   ├── .env                  # Environment config
│   ├── server.js             # Main entry point
│   └── package.json          # Dependencies
├── client/                   # Frontend
│   ├── css/
│   │   └── style.css         # Minimalist styling
│   ├── js/
│   │   ├── api.js            # API client
│   │   ├── auth.js           # Auth utilities
│   │   └── app.js            # App utilities
│   ├── index.html            # Home page
│   ├── post.html             # Single post view
│   ├── login.html            # Login page
│   ├── signup.html           # Signup page
│   └── dashboard.html        # User dashboard
└── README.md                 # Documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone and Install

```bash
cd blogging-system

# Install server dependencies
cd server
npm install

# Return to project root
cd ..
```

### 2. Configure Environment Variables

Edit `server/.env` and add your configuration:

```env
# MongoDB Connection String
# Get this from MongoDB Atlas or use local MongoDB
MONGODB_URI=mongodb://localhost:27017/blogging-system

# JWT Secret (IMPORTANT: Change this in production!)
# Generate a strong secret: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server Port
PORT=3000

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 3. Set Up MongoDB

**Option A: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add IP to whitelist (use `0.0.0.0/0` for all IPs)

**Option B: Local MongoDB**
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start MongoDB: `mongod`
3. Use: `MONGODB_URI=mongodb://localhost:27017/blogging-system`

### 4. Start the Server

```bash
cd server
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxx.mongodb.net
🚀 Blogging System Server Running
   Local:   http://localhost:3000
   API:     http://localhost:3000/api
```

### 5. Open in Browser

Navigate to: **http://localhost:3000**

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Posts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/posts` | Get all posts | Public |
| GET | `/api/posts/:id` | Get single post | Public |
| POST | `/api/posts` | Create post | Private |
| PUT | `/api/posts/:id` | Update post | Private* |
| DELETE | `/api/posts/:id` | Delete post | Private* |
| GET | `/api/posts/user/me` | Get user's posts | Private |

*Owner only

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/posts/:id/comments` | Add comment | Private |
| DELETE | `/api/posts/:id/comments/:commentId` | Delete comment | Private* |

*Owner only

## 🎨 Usage Guide

### For Users (Visitors)
1. **Browse Posts**: View all posts on the homepage
2. **Read More**: Click any post to view full content
3. **View Comments**: See what others are saying

### For Registered Users
1. **Sign Up**: Create an account
2. **Login**: Access your account
3. **Dashboard**: Manage your posts
4. **Create Post**: Write new articles
5. **Edit/Delete**: Manage your content
6. **Comment**: Engage with posts

## 🚢 Deployment

### Deploy to Render (Free)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Create MongoDB Atlas Database**
   - Set up free cluster
   - Get connection string

3. **Deploy Backend**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Build command: `cd server && npm install`
   - Start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your Atlas connection string
     - `JWT_SECRET`: Strong random string
     - `NODE_ENV`: `production`
     - `CLIENT_URL`: Your frontend URL

4. **Update Client URL**
   - After deployment, update `CLIENT_URL` to your Render URL

### Deploy Frontend Separately

**Netlify/Vercel:**
1. Build client: The server serves static files
2. Or deploy client folder separately

**Static Build:**
```bash
# Build for production
npm run build
```

## 🔒 Security Notes

1. **JWT_SECRET**: Always use a strong, random string in production
2. **Environment Variables**: Never commit `.env` to version control
3. **CORS**: Configure `CLIENT_URL` appropriately
4. **MongoDB**: Use authentication and encryption in production

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Or test manually with curl
curl http://localhost:3000/api/health
```

## 📚 Learning Outcomes

After completing this project, trainees will understand:

- ✅ **Express.js REST API** development
- ✅ **MongoDB** with Mongoose ODM
- ✅ **JWT Authentication** flow
- ✅ **User Authorization** patterns
- ✅ **CRUD Operations** implementation
- ✅ **Frontend-Backend Integration**
- ✅ **Environment Configuration**
- ✅ **Production Deployment**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Frontend | Vanilla HTML/CSS/JS |
| Styling | Custom CSS (No frameworks) |
| Environment | dotenv |

## 📄 License

MIT License - feel free to use for learning or production.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

**Built with ❤️ for learning full-stack development**

