# Git Commands for NexaLearn LMS Project

## Initial Setup and Push Main Branch

```bash
# Initialize git repository (if not already initialized)
git init

# Check current status
git status

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: NexaLearn LMS with black and mustard yellow theme

- Premium LMS platform with modern UI/UX
- Black background with mustard yellow (#d4af37) theme
- Complete landing page with hero, features, courses, testimonials
- Student, Instructor, and Admin dashboards
- Authentication pages (Login, Register)
- Course listing and filtering
- Responsive design with dark mode support
- Built with React, TypeScript, Tailwind CSS, and Framer Motion

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/nexalearn-lms.git

# Push to main branch
git push -u origin main
```

## Create and Push Development Branch

```bash
# Create and switch to development branch
git checkout -b development

# Push development branch to remote
git push -u origin development
```

## Create Feature Branches for Teammates

### Branch Naming Convention: `teammate-name/page-name`

```bash
# Example: Create branches for different team members working on different pages

# Teammate: Sarah - Working on Course Detail Page
git checkout development
git checkout -b sarah/course-detail-page
git push -u origin sarah/course-detail-page

# Teammate: Michael - Working on Settings Page
git checkout development
git checkout -b michael/settings-page
git push -u origin michael/settings-page

# Teammate: Emma - Working on Instructor Analytics
git checkout development
git checkout -b emma/instructor-analytics
git push -u origin emma/instructor-analytics

# Teammate: David - Working on Admin Reports
git checkout development
git checkout -b david/admin-reports
git push -u origin david/admin-reports

# Teammate: Lisa - Working on Quiz Module
git checkout development
git checkout -b lisa/quiz-module
git push -u origin lisa/quiz-module

# Teammate: James - Working on Certificate Generator
git checkout development
git checkout -b james/certificate-generator
git push -u origin james/certificate-generator

# Teammate: Alex - Working on Payment Integration
git checkout development
git checkout -b alex/payment-integration
git push -u origin alex/payment-integration

# Teammate: Rachel - Working on Video Player
git checkout development
git checkout -b rachel/video-player
git push -u origin rachel/video-player

# Teammate: Tom - Working on Discussion Forum
git checkout development
git checkout -b tom/discussion-forum
git push -u origin tom/discussion-forum

# Teammate: Nina - Working on Progress Tracker
git checkout development
git checkout -b nina/progress-tracker
git push -u origin nina/progress-tracker
```

## Workflow for Teammates

### When starting work on your branch:

```bash
# Switch to your branch
git checkout your-name/page-name

# Pull latest changes from development
git pull origin development

# Start coding...
```

### When committing changes:

```bash
# Check what files changed
git status

# Add specific files or all files
git add src/app/pages/your-page.tsx
# OR add all changes
git add .

# Commit with descriptive message
git commit -m "Add: Course detail page with curriculum accordion

- Created CourseDetailPage component
- Added video preview section
- Implemented reviews and ratings display
- Added enrollment functionality
- Responsive design for mobile"

# Push to your branch
git push origin your-name/page-name
```

### When ready to merge into development:

```bash
# Make sure you're on your branch
git checkout your-name/page-name

# Pull latest from development to avoid conflicts
git pull origin development

# Resolve any conflicts if they occur

# Push your updated branch
git push origin your-name/page-name

# Create Pull Request on GitHub
# Go to: https://github.com/YOUR_USERNAME/nexalearn-lms/pulls
# Click "New Pull Request"
# Base: development <- Compare: your-name/page-name
# Add description and request review
```

## Common Git Commands

```bash
# Check which branch you're on
git branch

# See all branches (local and remote)
git branch -a

# Switch branches
git checkout branch-name

# Create new branch and switch to it
git checkout -b new-branch-name

# Pull latest changes from remote
git pull origin branch-name

# View commit history
git log --oneline --graph

# Discard changes in working directory
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View differences
git diff

# Stash changes temporarily
git stash
git stash pop  # Apply stashed changes back
```

## Best Practices

1. **Always pull before starting work**
   ```bash
   git pull origin development
   ```

2. **Commit often with clear messages**
   - Use present tense: "Add feature" not "Added feature"
   - Be descriptive but concise
   - Reference issue numbers if applicable

3. **Keep branches focused**
   - One feature/page per branch
   - Don't mix unrelated changes

4. **Test before pushing**
   - Run the app locally
   - Check for errors
   - Ensure responsive design works

5. **Update from development regularly**
   ```bash
   git pull origin development
   ```

6. **Don't commit sensitive data**
   - API keys
   - Passwords
   - Personal information

## Resolving Merge Conflicts

```bash
# When conflicts occur:
# 1. Git will mark conflicted files
git status

# 2. Open conflicted files and look for:

# Your changes

# Their changes
# >>>>>>> branch-name

# 3. Manually resolve conflicts

# 4. Mark as resolved
git add conflicted-file.tsx

# 5. Complete the merge
git commit -m "Resolve merge conflicts in filename"

# 6. Push
git push origin your-branch-name
```

## Emergency Commands

```bash
# Undo everything and go back to last commit (DANGEROUS!)
git reset --hard HEAD

# Recover deleted branch (within 30 days)
git reflog
git checkout -b recovered-branch HEAD@{n}

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

## Project-Specific Branches

### Main Branch
- `main` - Production-ready code
- Protected branch, requires pull request

### Development Branch  
- `development` - Integration branch for features
- All feature branches merge here first

### Feature Branches
Format: `teammate-name/feature-name`

**Current Feature Branches:**
- `sarah/course-detail-page` - Course detail page with curriculum
- `michael/settings-page` - User settings and preferences
- `emma/instructor-analytics` - Instructor performance analytics
- `david/admin-reports` - Admin reporting dashboard
- `lisa/quiz-module` - Quiz creation and taking
- `james/certificate-generator` - Certificate generation system
- `alex/payment-integration` - Payment processing
- `rachel/video-player` - Custom video player
- `tom/discussion-forum` - Student discussion forum
- `nina/progress-tracker` - Learning progress tracking

## Notes

- Replace `YOUR_USERNAME` with your actual GitHub username
- Replace `nexalearn-lms` with your actual repository name
- Customize teammate names and branch names as needed
- Always communicate with team before force pushing
- Use GitHub Pull Requests for code review before merging to development
