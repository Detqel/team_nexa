# 🚀 Quick Start Guide - NexaLearn LMS

## Theme Colors

The application now uses a **Black & Mustard Yellow** theme:

- **Primary Color:** Mustard Yellow `#d4af37`
- **Accent Color:** Light Yellow `#f5c842`  
- **Secondary Color:** Dark Gold `#b8930d`
- **Background:** Pure Black `#000000`
- **Cards:** Dark Gray `#1a1a1a`
- **Text:** White/Light Gray

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and pnpm installed

### Install Dependencies
```bash
cd /workspaces/default/code
pnpm install
```

### Run Development Server
```bash
# The dev server is already running in this environment
# If you need to start it manually:
pnpm dev
```

---

## 🌿 Git Setup - Complete Workflow

### Step 1: Initialize Repository

```bash
# Run the automated setup script
./setup-git-branches.sh
```

**OR manually:**

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: NexaLearn LMS with black and mustard yellow theme"

# Add your remote repository
git remote add origin https://github.com/YOUR_USERNAME/nexalearn-lms.git

# Push to GitHub
git push -u origin main
```

### Step 2: Create Development Branch

```bash
# Create and switch to development branch
git checkout -b development

# Push to remote
git push -u origin development
```

### Step 3: Create Feature Branches for Team

```bash
# Switch to development first
git checkout development

# Create branches for each teammate
git checkout -b sarah/course-detail-page
git push -u origin sarah/course-detail-page

git checkout development
git checkout -b michael/settings-page
git push -u origin michael/settings-page

git checkout development
git checkout -b emma/instructor-analytics
git push -u origin emma/instructor-analytics

git checkout development
git checkout -b david/admin-reports
git push -u origin david/admin-reports

git checkout development
git checkout -b lisa/quiz-module
git push -u origin lisa/quiz-module

git checkout development
git checkout -b james/certificate-generator
git push -u origin james/certificate-generator

git checkout development
git checkout -b alex/payment-integration
git push -u origin alex/payment-integration

git checkout development
git checkout -b rachel/video-player
git push -u origin rachel/video-player

git checkout development
git checkout -b tom/discussion-forum
git push -u origin tom/discussion-forum

git checkout development
git checkout -b nina/progress-tracker
git push -u origin nina/progress-tracker
```

### Step 4: Push All Branches at Once

```bash
# Push all branches to remote
git push --all origin
```

---

## 👥 Team Member Workflow

### For Sarah (Course Detail Page)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/nexalearn-lms.git
cd nexalearn-lms

# Checkout your branch
git checkout sarah/course-detail-page

# Install dependencies
pnpm install

# Start working...
# Create file: src/app/pages/course-detail.tsx

# After making changes
git add .
git commit -m "Add course detail page with video preview"
git push origin sarah/course-detail-page
```

### For Michael (Settings Page)

```bash
git checkout michael/settings-page
# Create file: src/app/pages/settings.tsx
# Work on the settings page...
git add .
git commit -m "Add settings page with profile and preferences"
git push origin michael/settings-page
```

### For Emma (Instructor Analytics)

```bash
git checkout emma/instructor-analytics
# Create file: src/app/pages/instructor-analytics.tsx
# Work on analytics...
git add .
git commit -m "Add instructor analytics dashboard"
git push origin emma/instructor-analytics
```

---

## 📋 Branch Assignment

| Teammate | Branch Name | Page/Feature | File Location |
|----------|-------------|--------------|---------------|
| Sarah | `sarah/course-detail-page` | Course Detail Page | `src/app/pages/course-detail.tsx` |
| Michael | `michael/settings-page` | Settings Page | `src/app/pages/settings.tsx` |
| Emma | `emma/instructor-analytics` | Instructor Analytics | `src/app/pages/instructor-analytics.tsx` |
| David | `david/admin-reports` | Admin Reports | `src/app/pages/admin-reports.tsx` |
| Lisa | `lisa/quiz-module` | Quiz Module | `src/app/pages/quiz.tsx` |
| James | `james/certificate-generator` | Certificate Generator | `src/app/pages/certificates.tsx` |
| Alex | `alex/payment-integration` | Payment Integration | `src/app/pages/payment.tsx` |
| Rachel | `rachel/video-player` | Video Player | `src/app/components/video-player.tsx` |
| Tom | `tom/discussion-forum` | Discussion Forum | `src/app/pages/forum.tsx` |
| Nina | `nina/progress-tracker` | Progress Tracker | `src/app/pages/progress.tsx` |

---

## 🔄 Daily Workflow

### Morning (Before Starting Work)

```bash
# Make sure you're on your branch
git checkout your-name/page-name

# Pull latest changes from development
git pull origin development

# Start coding!
```

### During Work

```bash
# Check what changed
git status

# Add specific files
git add src/app/pages/your-page.tsx

# OR add all changes
git add .

# Commit with clear message
git commit -m "Add: Feature description

- Detail 1
- Detail 2
- Detail 3"

# Push to your branch
git push origin your-name/page-name
```

### End of Day (Or When Feature Complete)

```bash
# Final commit
git add .
git commit -m "Complete: Feature name - Ready for review"
git push origin your-name/page-name

# Create Pull Request on GitHub:
# 1. Go to repository on GitHub
# 2. Click "Pull Requests" tab
# 3. Click "New Pull Request"
# 4. Base: development <- Compare: your-name/page-name
# 5. Add description
# 6. Request review from team lead
```

---

## 🎨 Theme Usage in Code

### Using Theme Colors

```tsx
// Mustard yellow primary button
<Button className="bg-primary text-primary-foreground">
  Click Me
</Button>

// Gradient button (primary to accent)
<Button className="bg-gradient-to-r from-primary to-accent">
  Gradient Button
</Button>

// Card with theme colors
<Card className="bg-card border-border">
  <CardContent>
    <h3 className="text-foreground">Title</h3>
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

### Available Theme Variables

```css
--primary: #d4af37 (Mustard Yellow)
--accent: #f5c842 (Light Yellow)
--secondary: #b8930d (Dark Gold)
--background: #000000 (Black)
--foreground: #f5f5f5 (White/Light Gray)
--card: #1a1a1a (Dark Gray)
--muted: #2a2a2a (Medium Gray)
--border: #333333 (Border Gray)
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── header.tsx       # Navigation header
│   │   ├── footer.tsx       # Footer
│   │   └── theme-toggle.tsx # Dark mode toggle
│   ├── pages/
│   │   ├── home.tsx         # Landing page ✅
│   │   ├── courses.tsx      # Course listing ✅
│   │   ├── login.tsx        # Login page ✅
│   │   ├── register.tsx     # Registration ✅
│   │   ├── student-dashboard.tsx    # Student dashboard ✅
│   │   ├── instructor-dashboard.tsx # Instructor dashboard ✅
│   │   ├── admin-dashboard.tsx      # Admin dashboard ✅
│   │   └── [ADD YOUR PAGE HERE]     # Your new page ⬅️
│   └── App.tsx             # Main app with routing
├── lib/
│   └── utils.ts            # Utility functions
└── styles/
    ├── theme.css           # Black & yellow theme ✅
    └── fonts.css           # Font imports
```

---

## 🐛 Common Issues & Solutions

### Issue: Merge Conflicts

```bash
# Pull latest from development
git pull origin development

# If conflicts, open conflicted files
# Look for <<<<<<< HEAD markers
# Manually fix conflicts
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin your-branch-name
```

### Issue: Accidentally Committed to Wrong Branch

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch-name

# Commit again
git add .
git commit -m "Your commit message"
git push origin correct-branch-name
```

### Issue: Need to Update Branch Name

```bash
# Rename local branch
git branch -m old-name new-name

# Delete old remote branch
git push origin --delete old-name

# Push new branch
git push -u origin new-name
```

---

## 📞 Getting Help

- **Git Commands:** See `GIT_COMMANDS.md`
- **Project Documentation:** See `README.md`
- **Code Issues:** Create an issue on GitHub
- **Questions:** Ask in team chat

---

## ✅ Checklist Before Pushing

- [ ] Code runs without errors
- [ ] Responsive design works (test mobile/tablet/desktop)
- [ ] No console errors
- [ ] Follows black & yellow theme
- [ ] Clear commit message
- [ ] Pulled latest from development
- [ ] All new files added to git

---

## 🎉 You're Ready!

Run the setup script or follow the manual steps above to get started with Git and begin working on your assigned page!

```bash
# Quick setup
./setup-git-branches.sh

# Then push everything
git push --all origin
```

**Happy Coding! 🚀**
