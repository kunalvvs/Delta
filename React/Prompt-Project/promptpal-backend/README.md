# PromptPal Backend

A Node.js/Express backend for PromptPal - An AI-powered prompt analysis tool.

## Features

- 🔐 JWT Authentication
- 📊 Gemini AI Integration
- 💾 MongoDB Database
- 🛡️ Secure API Endpoints
- 👤 User Management

## Environment Variables

Required environment variables for deployment:

- `MONGO_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend application URL
- `NODE_ENV`: Environment (production/development)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Prompts
- `GET /api/prompts` - Get user prompts (protected)
- `POST /api/prompts/analyze` - Analyze prompt (protected)

## Deployment

This application is configured for deployment on Render using the `render.yaml` configuration file.

### Deploy to Render

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy using the render.yaml configuration

## Local Development

```bash
npm install
npm run dev
```

Make sure to create a `.env` file with the required environment variables.
