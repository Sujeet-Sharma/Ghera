# Assets Directory

This directory contains static assets used throughout the application.

## Structure

- **images/** - Image files (logos, photos, product images, illustrations)
- **icons/** - Icon files (SVG icons, PNG icons, favicons)
- **fonts/** - Custom font files (if using custom fonts)

## Usage

Assets in this directory can be referenced in your components and styles using:

```typescript
// In component templates
<img src="assets/images/logo.png" alt="Logo" />

// In component styles (CSS/SCSS)
background-image: url('/assets/images/hero-bg.jpg');

// In component TypeScript
const imagePath = 'assets/images/product.jpg';
```

Note: The `assets/` path is already configured in `angular.json` and will be copied to the output directory during the build process.
