# PromptPal Frontend

A React frontend for PromptPal - An AI-powered prompt analysis tool built with Vite and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS v4
- 🔐 JWT Authentication
- 📊 Real-time Prompt Analysis
- 📱 Responsive Design
- ⚡ Fast Development with Vite
- 🔄 User History Management

## Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PromptPal
VITE_APP_VERSION=1.0.0
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deploy to Render

1. Build Command: `npm run build`
2. Publish Directory: `dist`
3. Add environment variables in Render dashboard

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
