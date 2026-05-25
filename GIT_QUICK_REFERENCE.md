# Git Quick Reference - NexaLearn LMS

## 🚀 ONE-COMMAND SETUP

```bash
# Run this to set up everything automatically
./setup-git-branches.sh
```

---

## ⚡ Essential Commands

### First Time Setup
```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit: NexaLearn LMS"

# 2. Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/nexalearn-lms.git

# 3. Push main branch
git push -u origin main

# 4. Create development branch
git checkout -b development
git push -u origin development
```

### Create ALL Team Branches at Once
```bash
# From development branch, run each:
git checkout -b sarah/course-detail-page && git push -u origin sarah/course-detail-page
git checkout development && git checkout -b michael/settings-page && git push -u origin michael/settings-page
git checkout development && git checkout -b emma/instructor-analytics && git push -u origin emma/instructor-analytics
git checkout development && git checkout -b david/admin-reports && git push -u origin david/admin-reports
git checkout development && git checkout -b lisa/quiz-module && git push -u origin lisa/quiz-module
git checkout development && git checkout -b james/certificate-generator && git push -u origin james/certificate-generator
git checkout development && git checkout -b alex/payment-integration && git push -u origin alex/payment-integration
git checkout development && git checkout -b rachel/video-player && git push -u origin rachel/video-player
git checkout development && git checkout -b tom/discussion-forum && git push -u origin tom/discussion-forum
git checkout development && git checkout -b nina/progress-tracker && git push -u origin nina/progress-tracker

# Push all branches
git push --all origin
```

---

## 👤 Daily Team Member Commands

### Start Working
```bash
git checkout your-name/page-name
git pull origin development
# Start coding...
```

### Save Work
```bash
git add .
git commit -m "Add: feature description"
git push origin your-name/page-name
```

### Create Pull Request
```bash
# 1. Push your final changes
git push origin your-name/page-name

# 2. Go to GitHub
# 3. Click "Pull Requests" > "New Pull Request"
# 4. Base: development <- Compare: your-name/page-name
# 5. Submit for review
```

---

## 🌿 Branch List

| Branch | Owner | Purpose |
|--------|-------|---------|
| `main` | - | Production code |
| `development` | - | Integration branch |
| `sarah/course-detail-page` | Sarah | Course detail page |
| `michael/settings-page` | Michael | Settings page |
| `emma/instructor-analytics` | Emma | Instructor analytics |
| `david/admin-reports` | David | Admin reports |
| `lisa/quiz-module` | Lisa | Quiz system |
| `james/certificate-generator` | James | Certificates |
| `alex/payment-integration` | Alex | Payments |
| `rachel/video-player` | Rachel | Video player |
| `tom/discussion-forum` | Tom | Forum |
| `nina/progress-tracker` | Nina | Progress tracking |

---

## 🔧 Useful Commands

```bash
# See all branches
git branch -a

# Switch branch
git checkout branch-name

# Check status
git status

# See changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Pull latest from development
git pull origin development

# See commit history
git log --oneline --graph

# Discard all local changes (CAREFUL!)
git reset --hard HEAD
```

---

## ⚠️ Fixing Common Mistakes

### Wrong Branch
```bash
# Don't commit yet? Just switch
git checkout correct-branch

# Already committed?
git reset --soft HEAD~1
git checkout correct-branch
git add .
git commit -m "Message"
```

### Merge Conflicts
```bash
git pull origin development
# Fix conflicts in files
git add .
git commit -m "Resolve conflicts"
git push origin your-branch
```

### Forgot to Pull First
```bash
git stash              # Save your changes
git pull origin development
git stash pop          # Reapply your changes
```

---

## 📝 Commit Message Format

```bash
# Good commit messages:
git commit -m "Add course detail page with video preview"
git commit -m "Fix responsive layout on mobile devices"
git commit -m "Update dashboard analytics charts"

# With description:
git commit -m "Add payment integration

- Stripe payment gateway
- Subscription management
- Invoice generation"
```

---

## 🎯 Complete Workflow Example

```bash
# 1. Start day
git checkout sarah/course-detail-page
git pull origin development

# 2. Work on code
# ... make changes ...

# 3. Save progress
git add .
git commit -m "Add course curriculum section"
git push origin sarah/course-detail-page

# 4. End of day or feature complete
git add .
git commit -m "Complete course detail page - ready for review"
git push origin sarah/course-detail-page

# 5. Create PR on GitHub
# development <- sarah/course-detail-page
```

---

## 🚨 Emergency Commands

```bash
# Abort merge
git merge --abort

# Undo everything (DANGEROUS!)
git reset --hard HEAD

# Recover deleted branch
git reflog
git checkout -b recovered HEAD@{n}

# Force push (avoid unless necessary)
git push --force origin branch-name
```

---

## 📚 Full Documentation

- **QUICK_START.md** - Complete setup guide
- **GIT_COMMANDS.md** - Detailed git instructions  
- **README.md** - Project documentation

---

## ✅ Before Every Push Checklist

- [ ] `git status` - Check what's changing
- [ ] `git pull origin development` - Get latest
- [ ] Code works locally
- [ ] No console errors
- [ ] Clear commit message
- [ ] `git push origin your-branch`

**Happy Coding! 🎉**
