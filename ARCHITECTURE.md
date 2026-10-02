# Project Architecture

This document describes the folder structure and architecture of the GheraByPriya Angular application.

## Directory Structure

```
src/app/
├── core/                    # Core module - singleton services, guards, interceptors
│   ├── services/           # Core services (API, Auth, etc.)
│   ├── guards/             # Route guards
│   └── interceptors/       # HTTP interceptors
│
├── shared/                  # Shared module - reusable components, directives, pipes
│   ├── components/         # Reusable UI components
│   ├── directives/         # Custom directives
│   └── pipes/              # Custom pipes
│
├── pages/                   # Feature pages/components
│   └── home/               # Home page component
│       ├── home.ts
│       ├── home.html
│       └── home.css
│
├── models/                  # TypeScript interfaces and models
│   └── product.model.ts    # Product interface
│
├── app.ts                   # Root component
├── app.config.ts           # Application configuration
├── app.routes.ts           # Route configuration
└── app.html                # Root template
```

## Architecture Principles

### 1. Core Directory (`/core`)
- Contains singleton services and application-wide utilities
- Services here are typically provided in the root injector
- Examples: Authentication service, API service, configuration service

### 2. Shared Directory (`/shared`)
- Contains reusable components, directives, and pipes
- These can be used across multiple features/pages
- Examples: Button component, Header component, Custom pipes

### 3. Pages Directory (`/pages`)
- Contains page-level components (features)
- Each page is self-contained with its own component, template, and styles
- Examples: Home page, Products page, About page, Contact page

### 4. Models Directory (`/models`)
- Contains TypeScript interfaces and type definitions
- Shared data models used across the application
- Each model should be in its own file with a `.model.ts` extension

## Adding New Features

### Adding a New Page
1. Create a new folder in `pages/` (e.g., `pages/products/`)
2. Generate the component files
3. Add the route in `app.routes.ts`

### Adding a Shared Component
1. Create the component in `shared/components/`
2. Export it from the shared module if needed
3. Import it in the page/feature that needs it

### Adding a Core Service
1. Create the service in `core/services/`
2. Provide it in `app.config.ts` if it should be a singleton
3. Inject it where needed

### Adding a Model
1. Create a new file in `models/` (e.g., `models/user.model.ts`)
2. Define the interface/type
3. Import it where needed

## Technology Stack

- **Angular**: 20.3.0
- **RxJS**: 7.8.0 (for reactive programming)
- **TypeScript**: 5.9.2

## State Management

Currently using RxJS (BehaviorSubject/Observable) for reactive state management. No signals are used as per project requirements.

## Routing

Routes are defined in `app.routes.ts` using Angular's standalone route configuration.

## Naming Conventions

- Components: PascalCase (e.g., `Home`, `ProductList`)
- Files: kebab-case (e.g., `home.ts`, `product.model.ts`)
- Folders: kebab-case (e.g., `pages/`, `shared/`)
- Interfaces: PascalCase (e.g., `Product`, `User`)
