# GitHub Pages Deployment Instructions

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the "+" icon in the top right and select "New repository"
3. Name it: `sinner-circle-optimizer`
4. Make it **Public** (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Update package.json

Replace `YOUR_GITHUB_USERNAME` in `package.json` line 5 with your actual GitHub username:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/sinner-circle-optimizer",
```

For example, if your username is `johnsmith`, it should be:
```json
"homepage": "https://johnsmith.github.io/sinner-circle-optimizer",
```

## Step 3: Push to GitHub

Run these commands in the terminal (replace YOUR_GITHUB_USERNAME with your username):

```bash
cd /Users/matthewpilkington/CascadeProjects/sinner-circle-optimizer
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/sinner-circle-optimizer.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages

After pushing to GitHub, run:

```bash
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Deploy the build folder to GitHub Pages

## Step 5: Access Your Live Site

After deployment completes (1-2 minutes), your app will be live at:

```
https://YOUR_GITHUB_USERNAME.github.io/sinner-circle-optimizer
```

You can share this URL with anyone!

## Updating Your Site

Whenever you make changes:

1. Make your code changes
2. Commit them: `git add . && git commit -m "Your message"`
3. Push to GitHub: `git push`
4. Deploy: `npm run deploy`

---

## Alternative: Quick Deploy Without GitHub Account

If you don't want to use GitHub, you can use Netlify Drop:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `build` folder
3. Get an instant shareable URL (no account needed!)
