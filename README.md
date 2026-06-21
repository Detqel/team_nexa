# NexaLearn - Premium Learning Management System

A modern, responsive Learning Management System (LMS) built with React, TypeScript, Tailwind CSS, and Framer Motion. NexaLearn provides a complete platform for online education with student, instructor, and admin dashboards.

## ✨ Features

### 🎨 Modern UI/UX
- Premium glassmorphism effects and gradients
- Dark/Light theme toggle with smooth transitions
- Responsive design optimized for all devices
- Smooth animations with Framer Motion
- Custom scrollbars and hover effects
- Professional EdTech aesthetic

### 🏠 Landing Page
- Hero section with animated gradients
- Statistics showcase (students, courses, instructors)
- Featured courses with hover animations
- Course categories with icons
- Top instructors profile cards
- Student testimonials carousel
- FAQ section with accordions
- Comprehensive footer

### 📚 Course Management
- Advanced course listing with filters
- Search functionality
- Category, level, price, and rating filters
- Sorting options (popularity, rating, price)
- Course cards with thumbnails and details
- Responsive pagination

### 👨‍🎓 Student Dashboard
- Analytics cards (enrolled courses, completed, hours, certificates)
- Learning activity charts
- Progress tracking with interactive graphs
- Enrolled courses with progress bars
- Upcoming deadlines calendar
- Recent activity timeline
- Sidebar navigation
- Continue learning section

### 👨‍🏫 Instructor Dashboard
- Course management table
- Revenue and enrollment analytics
- Student analytics charts
- Create course modal with forms
- Course statistics (students, revenue, ratings)
- Recent student enrollments
- Drag-and-drop upload UI (planned)
- Quiz and assignment management

### 🛡️ Admin Dashboard
- User management with filters
- System health monitoring
- Revenue and user growth charts
- Course category distribution (pie chart)
- User registration trends
- Recent activity feed
- Advanced data tables with actions
- Export reports functionality

### 🔐 Authentication
- Modern split-screen layouts
- Login page with social auth
- Register page with password strength indicator
- Password visibility toggle
- Remember me functionality
- Forgot password flow (planned)
- OTP verification (planned)

## 🛠️ Tech Stack

- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.12
- **Routing:** React Router 7.13.0
- **Animations:** Framer Motion (motion) 12.23.24
- **UI Components:** Radix UI
- **Charts:** Recharts 2.15.2
- **Form Handling:** React Hook Form 7.55.0
- **Icons:** Lucide React
- **Theme:** next-themes
- **Toast Notifications:** Sonner
- **Build Tool:** Vite 6.3.5

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── header.tsx       # Main navigation header
│   │   ├── footer.tsx       # Footer with links
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/
│   │   ├── home.tsx         # Landing page
│   │   ├── courses.tsx      # Course listing
│   │   ├── login.tsx        # Login page
│   │   ├── register.tsx     # Registration
│   │   ├── student-dashboard.tsx
│   │   ├── instructor-dashboard.tsx
│   │   └── admin-dashboard.tsx
│   └── App.tsx             # Main app with routing
├── lib/
│   └── utils.ts            # Utility functions
└── styles/
    ├── theme.css           # Custom theme and colors
    └── fonts.css           # Font imports

```

## 🎨 Color Palette

### Light Mode
- **Primary:** Indigo (#6366f1)
- **Secondary:** Purple (#8b5cf6)
- **Accent:** Cyan (#06b6d4)
- **Background:** White (#ffffff)
- **Foreground:** Slate (#1e293b)

### Dark Mode
- **Primary:** Indigo (#818cf8)
- **Secondary:** Purple (#a78bfa)
- **Accent:** Cyan (#22d3ee)
- **Background:** Slate (#0f172a)
- **Foreground:** Slate (#f1f5f9)

### Gradients
- Primary: Indigo → Purple
- Secondary: Blue → Cyan
- Accent: Purple → Pink
- Hero: Multi-color gradient

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd nexalearn
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm dev
```

The application will be available at the preview URL provided.

## 📱 Responsive Design

NexaLearn is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Features include:
- Collapsible sidebars on mobile
- Mobile navigation drawer
- Adaptive card layouts
- Touch-friendly buttons
- Optimized images and typography

## 🎯 Key Components

### Dashboards
- **Student Dashboard:** Track learning progress, view enrolled courses, upcoming deadlines
- **Instructor Dashboard:** Manage courses, view analytics, track revenue
- **Admin Dashboard:** Monitor platform health, manage users, view system analytics

### Authentication
- Modern split-screen design
- Social login integration (Google, GitHub)
- Password strength indicators
- Form validation

### Course System
- Advanced filtering and search
- Course cards with rich metadata
- Rating and review system
- Enrollment tracking

## 🔧 Customization

### Theme Colors
Edit `src/styles/theme.css` to customize colors:
- Update CSS variables in `:root` and `.dark`
- Modify gradient definitions
- Adjust color tokens

### Components
All UI components are in `src/app/components/ui/` and can be customized:
- Button variants and sizes
- Card styles
- Input fields
- Badges and labels

## 📊 Features in Detail

### Analytics & Charts
- Line charts for revenue and learning activity
- Bar charts for enrollments and progress
- Pie charts for course distribution
- Responsive chart containers
- Custom tooltips and legends

### Animations
- Page transitions with Framer Motion
- Hover effects on cards and buttons
- Animated gradients and blobs
- Smooth scroll behavior
- Loading states and skeletons

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus indicators
- Screen reader support

## 🎓 User Roles

1. **Student**
   - Browse and enroll in courses
   - Track progress
   - View certificates
   - Submit assignments
   - Take quizzes

2. **Instructor**
   - Create and manage courses
   - Upload content
   - View student analytics
   - Track revenue
   - Manage assignments and quizzes

3. **Admin**
   - Manage all users
   - Monitor platform health
   - View comprehensive analytics
   - Generate reports
   - System configuration

## 🌟 Premium Features

- Glassmorphism card effects
- Animated gradient backgrounds
- Interactive data visualizations
- Real-time notifications
- Progress tracking
- Certificate generation
- Advanced filtering
- Search functionality

## 📝 License

This project is created for educational purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

## 📧 Contact

For questions or feedback about NexaLearn, please reach out through the contact page.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion