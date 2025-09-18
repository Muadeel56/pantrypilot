# Views

This directory contains page-level Vue components that represent different routes.

## Structure

- Each view corresponds to a route in the application
- Views should be named with the suffix "View" (e.g., HomeView, DashboardView)
- Views typically compose multiple components together
- Keep views focused on layout and data fetching

## Example

```vue
<template>
  <div class="view-name">
    <h1>Page Title</h1>
    <!-- Page content and components -->
  </div>
</template>

<script setup lang="ts">
// View-specific logic and data fetching
</script>

<style scoped>
/* View-specific styles */
</style>
```
