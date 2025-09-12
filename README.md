# Nightapp V3 - Social Gaming Platform

A modern social gaming platform built with React, TypeScript, and Firebase.

![Nightapp V3 Loading Screen](https://github.com/user-attachments/assets/1d5934bf-a937-41a2-80d6-af572bed17f9)

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Firebase v10 (Auth + Firestore + Realtime Database)
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **Build Tool**: Vite
- **Design System**: Custom CSS variables with gaming theme

## 🎨 Design System

The application uses a custom design system with these core colors:
- **Primary**: `#6366f1` (Indigo)
- **Surface**: `#1e293b` (Slate)
- **Text**: `#f1f5f9` (Light Gray)

## 📁 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.tsx       # Navigation header with user status
│       ├── Layout.tsx       # Main layout wrapper
│       └── index.ts         # Component exports
├── hooks/
│   └── useAuth.ts          # Custom authentication hook
├── lib/
│   └── firebase.ts         # Firebase configuration
├── stores/
│   └── authStore.ts        # Zustand auth state management
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Realtime Database
3. Copy your Firebase config and replace the placeholder in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### 4. Build for Production

```bash
npm run build
```

## 🎮 Features

### Core Features
- **User Authentication**: Sign up, sign in, and secure session management
- **Gaming Profiles**: User stats, levels, experience points, and game history
- **Social Features**: Friends system, status indicators, and social interactions
- **Real-time Updates**: Live status updates and notifications
- **Responsive Design**: Mobile-first design that works on all devices

### User Profile System
- Level progression and experience points
- Win/loss tracking and statistics
- Gaming status indicators (online, offline, in-game, away)
- Customizable user preferences
- Friend requests and social connections

### Event System
- Tournament creation and management
- Event participation tracking
- Prize and reward systems
- Location-based events (online/physical)
- Event categorization and filtering

## 🔐 Authentication Features

The authentication system includes:
- Email/password authentication
- User profile creation and management
- Session persistence
- Automatic status updates (online/offline)
- Secure state management with Zustand

## 🎨 UI Components

### Layout Components
- **Header**: Navigation with user avatar, status, and quick actions
- **Layout**: Main wrapper with gradient background and footer
- **Cards**: Reusable card components for stats and content

### Interactive Elements
- Hover animations with Framer Motion
- Loading states with spinning animations
- Button variants (primary, secondary)
- Form inputs with focus states

## 🚀 Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Setup
- Node.js 18+ required
- Firebase project with enabled services
- Modern browser with ES2020 support

## 🔮 Future Enhancements

- Real-time chat system
- Advanced tournament brackets
- Achievement system
- Leaderboards and rankings
- Push notifications
- Mobile app versions
- Integration with gaming platforms

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for the gaming community**
