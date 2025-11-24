# 🚀 Render Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] Backend builds successfully (`npm run build`)
- [x] Environment variables documented
- [x] Error handling improved with detailed logs
- [x] Using stable Gemini model (gemini-1.5-flash)
- [x] API key validation added
- [x] Health check endpoint available
- [x] CORS configured
- [x] Rate limiting enabled
- [x] Security middleware (Helmet) configured

## 🔑 Critical: Environment Variables on Render

**You MUST set these in Render Dashboard:**

1. Go to: https://dashboard.render.com
2. Select your service: `devfestajah-ai-be`
3. Click **Environment** tab
4. Add these variables:

```
GEMINI_API_KEY = <your-actual-key-from-google-ai-studio>
GEMINI_MODEL = gemini-3-pro
NODE_ENV = production
```

**Get your Gemini API Key:**
👉 https://makersuite.google.com/app/apikey

## 🐛 Troubleshooting Your Current Error

### Problem
```json
{
  "message": "Failed to generate chat reply"
}
```

### Root Cause
The `GEMINI_API_KEY` is **not set** or **invalid** in your Render environment variables.

### Solution
1. Go to Render Dashboard
2. Click on your service `devfestajah-ai-be`
3. Go to **Environment** tab
4. Check if `GEMINI_API_KEY` exists
5. If missing, click **Add Environment Variable**:
   - Key: `GEMINI_API_KEY`
   - Value: Your actual API key
6. Click **Save Changes**
7. Render will automatically redeploy

### Verify the Fix

After redeploying, check the logs:

**Expected to see:**
```
✅ GEMINI_API_KEY is configured
Using model: gemini-1.5-flash
Server is running on port 10000
```

**If you see:**
```
❌ ERROR: GEMINI_API_KEY is not set!
```
Then the environment variable is still not configured properly.

### Test the API

```bash
# Replace with your actual Render URL
curl -X POST https://devfestajah-ai-be.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

**Expected Success Response:**
```json
{
  "reply": "...",
  "createdAt": "2025-11-24T..."
}
```

## 📋 Deployment Steps

### Option 1: Auto-Deploy from GitHub (Recommended)

1. **Push changes to GitHub**
   ```bash
   cd /Users/hh/Desktop/build/devfestAjah/server
   git add .
   git commit -m "fix: improve error handling and use stable gemini model"
   git push origin main
   ```

2. **Render auto-deploys** (if connected to GitHub)
   - Watch deployment in Render Dashboard
   - Check logs for any errors

### Option 2: Manual Deploy

1. **Connect GitHub repo to Render**
   - Dashboard → New Web Service
   - Connect repository
   - Select branch: `main`

2. **Configure as described above**

3. **Deploy**

## 🔍 Post-Deployment Verification

### 1. Check Service Status
- Dashboard → Your Service → Status should be "Live"

### 2. Check Logs
```
✅ GEMINI_API_KEY is configured
Using model: gemini-1.5-flash
Server is running on port 10000
Environment: production
```

### 3. Test Health Endpoint
```bash
curl https://devfestajah-ai-be.onrender.com/health
```
Should return: `{"status":"ok"}`

### 4. Test Chat Endpoint
```bash
curl -X POST https://devfestajah-ai-be.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### 5. Update Frontend
Make sure your Angular app points to the correct backend URL:
```typescript
// src/app/core/services/api-client.service.ts
private apiUrl = 'https://devfestajah-ai-be.onrender.com/api';
```

## ⚠️ Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after sleep: 30-60 seconds delay
- Consider upgrading for production apps

### API Key Security
- ✅ Never commit API keys to git
- ✅ Only set in Render environment variables
- ✅ Rotate keys periodically
- ✅ Monitor usage in Google AI Studio

### Model Selection
- `gemini-1.5-flash`: Fast, cost-effective (default)
- `gemini-1.5-pro`: More capable, slower, more expensive
- `gemini-2.0-flash`: Very new, may not be stable yet

## 🎯 Next Steps After Backend is Fixed

1. ✅ Verify backend works on Render
2. Update frontend if needed (already done)
3. Deploy frontend to Netlify
4. Test end-to-end functionality
5. Monitor logs for any issues

## 📞 Need Help?

If still having issues:
1. Check Render logs: Dashboard → Service → Logs
2. Verify API key in Google AI Studio
3. Test locally with same API key
4. Check API quotas/billing

---

**Status**: Ready for deployment ✅
**Next Action**: Set `GEMINI_API_KEY` in Render environment variables
