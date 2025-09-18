# Assets

This directory contains static assets used throughout the application.

## Structure

- **images/**: Store image files (PNG, JPG, SVG, etc.)
- **icons/**: Store icon files
- **fonts/**: Store custom font files
- **data/**: Store static data files (JSON, CSV, etc.)

## Usage

Assets in this directory are processed by Vite and can be imported in your components:

```typescript
// Import images
import logo from '@/assets/images/logo.png';

// Import data
import config from '@/assets/data/config.json';
```

## Best Practices

- Use descriptive filenames
- Optimize images for web use
- Consider using SVG for icons when possible
- Keep file sizes reasonable
