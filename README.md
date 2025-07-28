# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.ㅁ# Dojeon Frontend

A React TypeScript frontend application for the Dojeon concert community platform.

## 🚀 Features

- **User Authentication**: Login and registration system
- **Dashboard**: Main community interface with posts and concerts
- **Post Management**: Create, read, update, and delete posts
- **Comment System**: Add and manage comments on posts
- **User Profiles**: Personal profile management and statistics
- **Music Player**: Background music player with BTS Jin theme
- **Responsive Design**: Mobile-friendly interface
- **Protected Routes**: Authentication-based route protection

## 🛠️ Technology Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 4.9.5
- **Routing**: React Router DOM 7.7.0
- **Build Tool**: Create React App 5.0.1
- **Styling**: CSS3 with custom components
- **Containerization**: Docker with Nginx
- **CI/CD**: GitHub Actions
- **Web Server**: Nginx

## 📁 Project Structure

```
frontend/
├── public/                          # Static assets
│   ├── index.html                   # Main HTML file
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # SEO robots file
│   ├── favicon.ico                  # Site icon
│   ├── logo192.png                  # App logo
│   ├── logo512.png                  # App logo (large)
│   ├── bts-jin-bg.jpg              # Background image
│   └── music/                       # Music files
├── src/
│   ├── components/                  # React components
│   │   ├── Login.tsx               # Login page
│   │   ├── Register.tsx            # Registration page
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── PostList.tsx            # Posts listing
│   │   ├── PostDetail.tsx          # Individual post view
│   │   ├── Write.tsx               # Post creation/editing
│   │   ├── MyPage.tsx              # User profile page
│   │   ├── MusicPlayer.tsx         # Background music player
│   │   ├── PrivateRoute.tsx        # Route protection
│   │   ├── Login.css               # Login styles
│   │   ├── Register.css            # Registration styles
│   │   ├── Dashboard.css           # Dashboard styles
│   │   ├── PostList.css            # Post list styles
│   │   ├── PostDetail.css          # Post detail styles
│   │   ├── Write.css               # Write page styles
│   │   ├── MyPage.css              # Profile page styles
│   │   └── MusicPlayer.css         # Music player styles
│   ├── config/                      # Configuration
│   │   └── api.ts                  # API endpoints
│   ├── App.tsx                      # Main application component
│   ├── App.css                      # App-level styles
│   ├── index.tsx                    # Application entry point
│   ├── index.css                    # Global styles
│   ├── logo.svg                     # React logo
│   ├── jin.jpeg                     # Background image
│   ├── reportWebVitals.ts           # Performance monitoring
│   ├── setupTests.ts                # Test setup
│   └── App.test.tsx                 # App tests
├── .github/workflows/               # CI/CD configuration
│   └── deploy-frontend.yml
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Local development
├── nginx.conf                       # Nginx configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🎨 UI Components

### Authentication
- **Login**: User authentication with email/password
- **Register**: New user registration with validation

### Main Interface
- **Dashboard**: Community hub with posts, concerts, and navigation
- **PostList**: Display all posts with pagination and filtering
- **PostDetail**: Individual post view with comments and likes
- **Write**: Post creation and editing interface

### User Features
- **MyPage**: User profile, statistics, and activity history
- **MusicPlayer**: Background music player with BTS Jin theme

### Navigation
- **PrivateRoute**: Authentication-based route protection
- **Responsive Navigation**: Mobile-friendly navigation menu

## 🔧 API Integration

### API Configuration
Located in `src/config/api.ts`:
- Centralized API endpoint definitions
- Environment variable support for base URL
- RESTful API integration with backend

### Endpoints Used
- **User Management**: Login, register, profile updates
- **Posts**: CRUD operations, likes, comments
- **Concerts**: Concert information display
- **Comments**: Post commenting system
- **Visitors**: Visitor tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kwohyuno/dojeon-FE.git
   cd dojeon-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Create .env file
   echo "REACT_APP_API_BASE_URL=http://localhost:8080" > .env
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Serve static files**
   ```bash
   npx serve -s build
   ```

## 🐳 Docker

### Build Image
```bash
docker build -t dojeon-frontend .
```

### Run Container
```bash
docker run -d \
  --name dojeon-frontend \
  --restart unless-stopped \
  -p 80:80 \
  dojeon-frontend
```

### Docker Compose
```bash
docker-compose up -d
```

## 🔄 CI/CD

The project uses GitHub Actions for automated deployment:

1. **Manual Trigger**: Go to Actions → Deploy Frontend → Run workflow
2. **Environment**: Select production/staging
3. **Deployment**: Automatically deploys to EC2 instance

### Required GitHub Secrets
- `EC2_HOST` - EC2 instance IP
- `EC2_USERNAME` - SSH username (ec2-user)
- `EC2_SSH_KEY` - SSH private key
- `REACT_APP_API_BASE_URL` - Backend API URL

## 🎵 Music Player

### Features
- Background music player with BTS Jin theme
- Play/pause controls
- Volume adjustment
- Auto-play on page load
- Persistent state across page navigation

### Implementation
- Custom React component with HTML5 Audio API
- CSS animations for visual feedback
- Local storage for user preferences

## 🎨 Styling

### Design System
- **Color Scheme**: BTS-themed purple and pink gradients
- **Typography**: Modern, readable fonts
- **Layout**: Responsive grid system
- **Components**: Custom CSS with animations

### Key Features
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and transforms
- **Modern UI**: Clean, intuitive interface
- **Accessibility**: Keyboard navigation and screen reader support

## 🔐 Authentication

### Implementation
- **Local Storage**: User session management
- **Protected Routes**: Authentication-based access control
- **Auto-redirect**: Unauthenticated users redirected to login

### Security Features
- **Route Protection**: PrivateRoute component
- **Session Management**: Local storage with user data
- **Input Validation**: Form validation and sanitization

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile Navigation**: Collapsible menu
- **Touch-friendly**: Large touch targets
- **Optimized Images**: Responsive image loading
- **Flexible Layout**: CSS Grid and Flexbox

## 🧪 Testing

### Available Scripts
```bash
npm test          # Run tests in watch mode
npm run build     # Build for production
npm start         # Start development server
```

### Test Files
- `App.test.tsx` - Main application tests
- `setupTests.ts` - Test configuration

## 📦 Build Process

### Development
```bash
npm start
```
- Hot reload enabled
- Development server on port 3000
- Source maps for debugging

### Production
```bash
npm run build
```
- Optimized bundle
- Minified code
- Static file generation
- Nginx serving

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_BASE_URL` - Backend API base URL

### Nginx Configuration
- **Static File Serving**: Optimized for React apps
- **Gzip Compression**: Reduced file sizes
- **Security Headers**: XSS protection, CSP
- **Caching**: Long-term caching for static assets

### Docker Configuration
- **Multi-stage Build**: Node.js build + Nginx serve
- **Optimized Image**: Alpine Linux base
- **Port 80**: Standard HTTP port

## 🚀 Performance

### Optimizations
- **Code Splitting**: React Router lazy loading
- **Image Optimization**: Compressed images
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser and CDN caching

### Monitoring
- **Web Vitals**: Performance metrics
- **Error Tracking**: Console error logging
- **User Analytics**: Page view tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Dojeon concert community platform.

## 🆘 Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Last Updated**: December 2024
**Version**: 1.0.0


The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
