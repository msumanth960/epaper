# NewsGrid ePaper - Vercel Deployment Guide

## Quick Deploy

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Deploy from the project directory:
```bash
cd /home/sumanth/FE/epaper2
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? **newsgrid-epaper** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
   - Or use "Deploy from CLI" option
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Option 3: Deploy from GitHub

1. Push your code to GitHub:
```bash
cd /home/sumanth/FE/epaper2
git init
git add .
git commit -m "Initial commit: NewsGrid ePaper application"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Import to Vercel:
   - Go to vercel.com
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

## Environment Variables

This project doesn't require any environment variables as it uses in-memory data.

## Build Verification

✅ Production build successful:
- Build time: 9.74s
- Output size: 465.52 kB (142.32 kB gzipped)
- No TypeScript errors
- All components optimized

## Post-Deployment

After deployment, your application will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **Preview**: Automatic preview URLs for each commit

## Vercel Configuration

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Dev command: `npm run dev`
- Install command: `npm install`

## Custom Domain (Optional)

To add a custom domain:
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments

If using Git integration:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from all other branches/PRs
- **Instant rollback**: Available in dashboard

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify Node.js version (should be 18.x or higher)
3. Ensure all dependencies are in `package.json`
4. Test local build: `npm run build`

## Performance Optimization

Already implemented:
- Code splitting via Vite
- Minified JavaScript
- Gzip compression
- Tree shaking for unused code

Your application is production-ready and optimized for deployment! 🚀
