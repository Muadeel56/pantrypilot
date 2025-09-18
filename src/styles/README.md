# Styles

This directory contains global styles and theme configurations.

## Structure

- **theme.css**: Main theme file with CSS variables and global styles
- **components/**: Component-specific styles
- **utilities/**: Utility classes and mixins
- **base/**: Base styles and resets

## Usage

Import styles in your main.ts or App.vue:

```typescript
import '@/styles/theme.css'
```

## Best Practices

- Use CSS custom properties for theming
- Keep component styles scoped when possible
- Use Tailwind CSS for utility classes
- Organize styles by feature or component
