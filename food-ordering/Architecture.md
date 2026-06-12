# Architecture Documentation

## Overview
This project is an enterprise-grade mobile-first application using React Native (Expo) for the frontend and a containerized Node.js backend.

## Folder Structure
### Mobile (Frontend)
- `src/app/`: Expo Router screens and layouts.
- `src/components/`: Reusable, styled UI components.
- `src/features/`: Domain-specific business logic.
- `src/store/`: Zustand state management.
- `src/api/`: React Query hooks and Axios configurations.
- `src/services/`: Global error handlers, logger, offline sync engines.

### Backend
- Containerized Node.js application connected to MongoDB and Redis.

## State Management & Data Flow
- **Local State**: Managed via Zustand.
- **Server State**: Managed via React Query with automatic caching and retry mechanisms.
- **Offline First**: AsyncStorage caches critical data, backed by a request queue that syncs when network is restored.

## API Architecture
- Axios interceptors attach JWT tokens.
- Secure storage is used for sensitive token persistence.
- Sentry captures network failures globally.
