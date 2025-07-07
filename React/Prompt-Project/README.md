# 🧠 PromptPal - AI Prompt Optimizer

A full-stack web application that analyzes and optimizes prompts using Google's Gemini AI. Get instant feedback on your prompts with scoring, suggestions, and improved versions.

## ✨ Features

- **AI-Powered Analysis**: Uses Google Gemini AI to analyze prompt quality
- **Smart Scoring**: Get a 1-10 power score for your prompts
- **Improvement Suggestions**: Receive detailed suggestions to enhance your prompts
- **Rewritten Versions**: Get optimized versions of your prompts
- **History Tracking**: View and manage your analyzed prompts
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Prompt-Project
```

### 2. Backend Setup

```bash
cd promptpal-backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/promptpal

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Server Port
PORT=5000

# Frontend URL (optional)
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../promptpal-frontend

# Install dependencies
npm install
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd promptpal-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd promptpal-frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 Configuration

### MongoDB Setup

1. **Local MongoDB:**
   - Install MongoDB locally
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/promptpal`

2. **MongoDB Atlas (Cloud):**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Replace `MONGO_URI` in `.env`

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file as `GEMINI_API_KEY`

## 📁 Project Structure

```
Prompt-Project/
├── promptpal-backend/
│   ├── controllers/
│   │   └── promptController.js    # API logic
│   │   └── Prompt.js             # MongoDB schema
│   │   └── promptRoutes.js       # API routes
│   │   └── server.js                 # Express server
│   └── package.json
├── promptpal-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PromptForm.jsx    # Analysis form
│   │   │   └── PromptHistory.jsx # History display
│   │   │   └── App.jsx               # Main app component
│   │   │   └── main.jsx              # App entry point
│   │   └── package.json
│   └── README.md
```

## 🛠️ API Endpoints

### POST `/api/prompts/analyze`
Analyze a prompt and get AI feedback.

**Request:**
```json
{
  "text": "Your prompt here"
}
```

**Response:**
```json
{
  "_id": "...",
  "text": "Your prompt here",
  "score": 8,
  "suggestions": "Detailed improvement suggestions...",
  "rewrite": "Improved version of your prompt...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/prompts/history`
Get the last 20 analyzed prompts.

**Response:**
```json
[
  {
    "_id": "...",
    "text": "Prompt text",
    "score": 8,
    "suggestions": "...",
    "rewrite": "...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🎨 Usage

1. **Enter Your Prompt**: Type or paste your prompt in the text area
2. **Analyze**: Click "Analyze Prompt" or press Ctrl+Enter
3. **Review Results**: 
   - Check your prompt's power score (1-10)
   - Read improvement suggestions
   - See the optimized version
4. **View History**: Scroll down to see your previous analyses

## 🛠️ Development

### Backend Development
```bash
cd promptpal-backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd promptpal-frontend
npm run dev  # Vite dev server with hot reload
```

### Building for Production
```bash
# Frontend
cd promptpal-frontend
npm run build

# Backend
cd promptpal-backend
npm start
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network access for cloud MongoDB

2. **Gemini API Error**
   - Verify your API key is correct
   - Check API key permissions
   - Ensure you have sufficient quota

3. **CORS Errors**
   - Check that frontend URL matches in backend CORS config
   - Verify both servers are running on correct ports

4. **Port Already in Use**
   - Change the port in `.env` file
   - Kill processes using the port: `npx kill-port 5000`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for the AI analysis capabilities
- React and Vite for the frontend framework
- Express.js for the backend API
- MongoDB for data persistence
- Tailwind CSS for styling 