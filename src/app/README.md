# Application Structure

This directory contains the main Angular application code organized into a feature-based architecture.

## Structure Overview

```
app/
├── core/              # Core functionality (services, guards, interceptors)
├── shared/            # Reusable components, directives, pipes
├── pages/             # Page-level components (features)
├── models/            # TypeScript interfaces and models
├── app.ts             # Root component
├── app.config.ts      # Application configuration
├── app.routes.ts      # Route definitions
└── app.html           # Root template
```

## Quick Reference

### Current Pages
- `pages/home/` - Home page component

### Current Models
- `models/product.model.ts` - Product interface

### Future Structure
When adding new features:
- **New Page**: Add to `pages/` directory
- **Shared Component**: Add to `shared/components/` directory  
- **Service**: Add to `core/services/` directory
- **Model**: Add to `models/` directory

See `ARCHITECTURE.md` in the root directory for detailed architecture documentation.
