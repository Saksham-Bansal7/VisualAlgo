# 🎨 VisualAlgo

**Transform Your Code into Beautiful Flowcharts Instantly!**

Turn your source code into easy-to-understand flowcharts with just one click. Whether you're a developer, student, or educator, VisualAlgo helps you visualize logic, debug faster, and explain code effortlessly. Supports multiple programming languages, powered by GROQ AI and MermaidJS.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://visualalgo.onrender.com)
## 🌟 Features

### 🚀 Core Functionality

- **Instant Code Visualization**: Convert algorithms into interactive flowcharts in seconds
- **Multi-Language Support**: JavaScript, Python, Java, and C++ with syntax highlighting
- **AI-Powered Analysis**: Advanced algorithm explanation with time & space complexity analysis
- **Real-time Code Editor**: Built-in CodeMirror editor with language-specific features
- **Mermaid Integration**: Generate beautiful, standardized flowcharts using MermaidJS

### 🎯 User Experience

- **Intuitive Dashboard**: Clean, modern interface for easy navigation
- **Code History**: Save, manage, and revisit your algorithm visualizations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Secure login/signup with JWT authentication

### 🧠 AI Features

- **Smart Code Analysis**: GROQ AI provides detailed algorithm explanations
- **Complexity Analysis**: Automatic time and space complexity calculations
- **Interactive Examples**: Pre-loaded examples for quick learning
- **Algorithm Insights**: Deep understanding of code logic and flow

## 🎮 Live Demo

🌐 **Visit the live application**: [https://visualalgo.onrender.com](https://visualalgo.onrender.com)

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library with latest features
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **CodeMirror** - Advanced code editor with syntax highlighting
- **React Router Dom** - Client-side routing
- **Axios** - HTTP client for API calls
- **MermaidJS** - Diagram and flowchart generation
- **Lucide React** - Beautiful icon library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **GROQ SDK** - AI-powered code analysis
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- GROQ API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/visualalgo.git
   cd visualalgo
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Environment (.env)**

   ```env
   # Database
   DB_CONNECTION_STRING=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # GROQ API
   VITE_GROQ_API_KEY=your_groq_api_key

   # Server
   PORT=5000
   ```

2. **Frontend Environment (.env)**
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 📱 Usage Guide

### 1. **Getting Started**

- Create an account or login to existing account
- Access the dashboard to see available tools

### 2. **Code Playground**

- Navigate to the playground from dashboard
- Choose your programming language (JavaScript, Python, Java, C++)
- Write or paste your algorithm code
- Click "Generate Flowchart" to visualize your code

### 3. **Algorithm Analysis**

- Use "Explain Algorithm" feature for detailed analysis
- Get time and space complexity information
- Understand code logic with AI-powered explanations

### 4. **Managing Projects**

- Save your code visualizations for future reference
- Access code history from the dashboard
- Edit and update existing projects
- Delete projects you no longer need

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Flowcharts

- `POST /api/flowcharts` - Create new flowchart
- `GET /api/flowcharts` - Get user flowcharts
- `GET /api/flowcharts/:id` - Get specific flowchart
- `PUT /api/flowcharts/:id` - Update flowchart
- `DELETE /api/flowcharts/:id` - Delete flowchart

### AI Features

- `POST /api/mermaidCode` - Generate Mermaid diagram
- `POST /api/algorithmExplanation` - Get algorithm explanation

## 🏗️ Project Structure

```
VisualAlgo/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── algorithmController.js # Algorithm analysis
│   │   ├── mermaidCodeController.js # Flowchart generation
│   │   ├── sourceCodeController.js # Code management
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication
│   ├── models/
│   │   ├── sourceCodeModel.js    # Code schema
│   │   └── userModel.js          # User schema
│   ├── routes/
│   │   ├── sourceCodeRoutes.js   # Code routes
│   │   └── userRoutes.js         # User routes
│   ├── utils/
│   │   └── mermaidPromptExamples.js # AI prompts
│   ├── package.json
│   └── server.js                 # Main server file
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── visual.svg
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── History.jsx      # Code history
│   │   │   ├── Login.jsx        # Login modal
│   │   │   ├── MermaidDiagram.jsx # Diagram renderer
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Playground.jsx   # Code editor
│   │   │   └── SignUp.jsx       # Signup modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   └── LandingPage.jsx  # Landing page
│   │   ├── utils/
│   │   │   ├── apiPaths.js      # API endpoints
│   │   │   ├── axiosInstance.js # HTTP client
│   │   │   └── mermaidUtils.js  # Mermaid utilities
│   │   ├── App.jsx              # Main app component
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # App entry point
│   ├── package.json
│   ├── tailwind.config.js       # TailwindCSS config
│   └── vite.config.js           # Vite configuration
└── README.md
```


## 🙏 Acknowledgments

- **GROQ** - For providing powerful AI capabilities
- **MermaidJS** - For beautiful diagram generation
- **CodeMirror** - For the excellent code editor
- **React Community** - For the amazing ecosystem
- **TailwindCSS** - For the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!** ⭐
