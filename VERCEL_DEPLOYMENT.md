# Deployment Guide for Vercel (vercel.app)

Your application is pre-configured to deploy directly to Vercel and run with full frontend SPA routing and serverless backend API support.

## Project Settings on Vercel Dashboard
When importing this repository into [Vercel](https://vercel.com):

1. **Framework Preset**: `Vite` (or `Other`)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

## Pre-Configured Files
- `vercel.json`: Handles SPA fallback routing to `/index.html` for client paths (`/about`, `/academics`, `/admissions`, `/campus`, `/blog`, `/contact`, `/admin`) while routing `/api/*` requests to the serverless function handler.
- `/api/index.ts`: Vercel Serverless Function entry point providing the public and admin REST API endpoints for Vercel.
- Database `/tmp` fallback: Automatically supports serverless SQLite storage in the `/tmp` scratch filesystem.
