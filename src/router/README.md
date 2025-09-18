# Router

This directory contains Vue Router configuration and route definitions.

## Structure

- **index.ts**: Main router configuration
- **routes/**: Individual route definitions (optional)
- **guards/**: Route guards and middleware (optional)

## Usage

The router is configured in main.ts and used throughout the application for navigation.

## Example Route Definition

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

## Best Practices

- Use lazy loading for route components
- Implement proper route guards for authentication
- Keep route definitions organized and maintainable
- Use TypeScript for route type safety
