# DevFest Ajah AI Backend

Backend API service for the DevFest Ajah AI application, powered by Google Gemini AI.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x
- npm
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your-actual-api-key-here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📦 Deployment on Render

### Step-by-Step Guide

1. **Push your code to GitHub** (if not already done)

2. **Go to [Render Dashboard](https://dashboard.render.com)**

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` folder as root directory

4. **Configure the service**
   - **Name**: `devfestajah-ai-be` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or specify if server is in subdirectory)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. **Set Environment Variables** (CRITICAL!)
   Click "Environment" tab and add:
   ```
   GEMINI_API_KEY = your-actual-gemini-api-key-here
   GEMINI_MODEL = gemini-1.5-flash
   NODE_ENV = production
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your API will be available at: `https://your-service-name.onrender.com`

### Verifying Deployment

Test your deployed API:

```bash
# Health check
curl https://your-service-name.onrender.com/health

# Test chat endpoint
curl -X POST https://your-service-name.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

### Common Issues

#### "Failed to generate chat reply"
- **Cause**: `GEMINI_API_KEY` not set in Render environment variables
- **Fix**: Go to Render Dashboard → Your Service → Environment → Add `GEMINI_API_KEY`

#### Service keeps sleeping (Free tier)
- Render free tier spins down after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds
- Consider using a paid plan or keep-alive service

#### Build fails
- Check build logs in Render dashboard
- Ensure Node.js version matches (20.x)
- Verify all dependencies are in `package.json`

## 🔧 API Endpoints

### Chat
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Your message here"
}
```

### Code Helper
```http
POST /api/code-helper
Content-Type: application/json

{
  "code": "Your code here",
  "context": "Optional context"
}
```

### Health Check
```http
GET /health
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 20.x
- **Framework**: Express.js 5.x
- **AI**: Google Gemini 1.5
- **Language**: TypeScript
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `GEMINI_API_KEY` | **Yes** | - | Google Gemini API key |
| `GEMINI_MODEL` | No | gemini-3-pro | Model version |
| `NODE_ENV` | No | development | Environment mode |

## 🔐 Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your environment variables

**⚠️ CRITICAL SECURITY WARNINGS:**
- ❌ **NEVER** share your API key publicly (chat, forums, screenshots)
- ❌ **NEVER** commit API keys to git repositories
- ❌ **NEVER** hardcode keys in source code
- ✅ **ALWAYS** use environment variables
- ✅ **ALWAYS** keep `.env` in `.gitignore`
- 🔒 Consider setting up API key restrictions in Google Cloud Console

## 📊 Monitoring

Check your Render service logs:
```bash
# Via Render Dashboard
Dashboard → Your Service → Logs

# Look for these startup messages:
# ✅ GEMINI_API_KEY is configured
# Using model: gemini-1.5-flash
# Server is running on port 3000
```

## 🤝 Contributing

1. Make your changes
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Push to GitHub
5. Render will auto-deploy (if enabled)

## 📄 License

ISC
