#!/bin/bash

# NexaLearn LMS - Git Setup and Branch Creation Script
# This script initializes the repository and creates all necessary branches

set -e  # Exit on error

echo "🚀 Setting up NexaLearn LMS Git Repository..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo -e "${BLUE}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
    echo ""
else
    echo -e "${YELLOW}Git repository already initialized${NC}"
    echo ""
fi

# Configure git (optional - update with your details)
echo -e "${BLUE}Configuring Git (update with your details)...${NC}"
# Uncomment and update these with your information:
# git config user.name "Your Name"
# git config user.email "your.email@example.com"
echo ""

# Add all files
echo -e "${BLUE}Adding all files to staging...${NC}"
git add .
echo -e "${GREEN}✓ Files staged${NC}"
echo ""

# Create initial commit
echo -e "${BLUE}Creating initial commit...${NC}"
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
echo -e "${GREEN}✓ Initial commit created${NC}"
echo ""

# Add remote (update with your repository URL)
echo -e "${YELLOW}⚠️  Add your remote repository:${NC}"
echo "git remote add origin https://github.com/YOUR_USERNAME/nexalearn-lms.git"
echo ""
echo -e "${YELLOW}Then push with:${NC}"
echo "git push -u origin main"
echo ""

# Create development branch
echo -e "${BLUE}Creating development branch...${NC}"
git checkout -b development
echo -e "${GREEN}✓ Development branch created${NC}"
echo ""

# Array of teammate branches
declare -a BRANCHES=(
    "sarah/course-detail-page:Course detail page with curriculum and video preview"
    "michael/settings-page:User settings, preferences, and account management"
    "emma/instructor-analytics:Instructor performance analytics and insights"
    "david/admin-reports:Admin reporting dashboard and system analytics"
    "lisa/quiz-module:Quiz creation, management, and student quiz taking"
    "james/certificate-generator:Certificate generation and verification system"
    "alex/payment-integration:Payment processing and subscription management"
    "rachel/video-player:Custom video player with progress tracking"
    "tom/discussion-forum:Student discussion forum and Q&A"
    "nina/progress-tracker:Learning progress tracking and milestones"
)

echo -e "${BLUE}Creating teammate feature branches...${NC}"
echo ""

for branch_info in "${BRANCHES[@]}"; do
    IFS=':' read -r branch description <<< "$branch_info"
    git checkout -b "$branch"
    echo -e "${GREEN}✓ Created: ${branch}${NC} - ${description}"
done

echo ""
echo -e "${GREEN}✓ All branches created successfully!${NC}"
echo ""

# Switch back to main
git checkout main

# Show all branches
echo -e "${BLUE}Available branches:${NC}"
git branch -a
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Git Setup Complete! 🎉${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Add your remote repository:"
echo "   git remote add origin YOUR_REPO_URL"
echo ""
echo "2. Push main branch:"
echo "   git push -u origin main"
echo ""
echo "3. Push development branch:"
echo "   git checkout development"
echo "   git push -u origin development"
echo ""
echo "4. Push all feature branches:"
echo "   git push --all origin"
echo ""
echo -e "${BLUE}Each teammate should:${NC}"
echo "1. Clone the repository"
echo "2. Checkout their branch: git checkout their-name/page-name"
echo "3. Start coding!"
echo ""
echo "📚 See GIT_COMMANDS.md for detailed instructions"
echo ""
