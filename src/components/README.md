# Components

This directory contains reusable Vue components.

## Structure

- Place shared, reusable components here
- Each component should be in its own file
- Use PascalCase for component names
- Include proper TypeScript types and props validation

## Example

```vue
<template>
  <div class="component-name">
    <!-- Component template -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Define props here
}

defineProps<Props>()
</script>

<style scoped>
/* Component styles */
</style>
```
