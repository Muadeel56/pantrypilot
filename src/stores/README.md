# Stores

This directory contains Pinia stores for state management.

## Structure

- Each store should manage a specific domain of the application state
- Use the Composition API style with `defineStore`
- Keep stores focused and single-responsibility
- Export store functions for easy importing

## Example

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('example', () => {
  // State
  const items = ref([])
  
  // Getters
  const itemCount = computed(() => items.value.length)
  
  // Actions
  const addItem = (item) => {
    items.value.push(item)
  }
  
  return {
    items,
    itemCount,
    addItem
  }
})
```
