# Nightapp V3 - Plateforme Sociale Gaming

Une plateforme sociale gaming moderne construite avec React, TypeScript et Firebase.

## Stack Technique

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Firebase v10 (Auth + Firestore + Realtime Database)
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **Design System**: Variables CSS personnalisées

## Structure du Projet

```
src/
├── lib/
│   └── firebase.ts          # Configuration Firebase
├── types/
│   ├── user.ts             # Types TypeScript pour User
│   ├── event.ts            # Types TypeScript pour Event
│   └── index.ts            # Export des types
├── stores/
│   └── authStore.ts        # Store Zustand pour l'authentification
├── hooks/
│   └── useAuth.ts          # Hook personnalisé pour l'auth
├── components/
│   ├── Layout.tsx          # Composant Layout de base
│   ├── Header.tsx          # Composant Header avec navigation
│   └── index.ts            # Export des composants
├── App.tsx                 # Composant principal
├── main.tsx               # Point d'entrée
├── index.css              # Styles globaux + Design System
└── vite-env.d.ts          # Types pour les variables d'environnement
```

## Design System

Le design system utilise les couleurs suivantes définies dans `:root` :

- **Primary**: `#6366f1` (Indigo)
- **Surface**: `#1e293b` (Slate foncé)
- **Text**: `#f1f5f9` (Slate très clair)

## Configuration

1. **Variables d'environnement** : Copiez `.env.example` vers `.env` et remplissez les valeurs Firebase
2. **Firebase** : Configurez votre projet Firebase avec Auth, Firestore et Realtime Database

## Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production

## Fonctionnalités Implémentées

### ✅ Infrastructure de Base
- Configuration React + TypeScript + Vite
- Configuration Firebase complète
- Store Zustand avec persistance
- Hook useAuth personnalisé
- Composants Layout et Header
- Design system avec Tailwind CSS

### 🎮 Fonctionnalités Gaming
- Types TypeScript pour User et Event
- Système de niveaux et d'expérience
- Gestion des achievements
- Statuts utilisateur (online, away, busy, offline)
- Préférences utilisateur personnalisables

### 🎨 Interface Utilisateur
- Header avec navigation responsive
- Hero section avec animations Framer Motion
- Section des fonctionnalités principales
- Design moderne avec effets visuels
- Support mobile et desktop

## Prochaines Étapes

1. Configuration complète Firebase (Auth, Firestore, Realtime DB)
2. Implémentation des fonctionnalités d'authentification
3. Création des pages pour les événements
4. Système de messagerie et notifications
5. Tableau de bord utilisateur

## Développement

Le projet est configuré pour le développement avec :
- Hot module replacement (HMR)
- TypeScript strict mode
- ESLint pour la qualité du code
- Optimisations de build automatiques

---

**Nightapp V3** - Connectons la communauté gaming ! 🎮
