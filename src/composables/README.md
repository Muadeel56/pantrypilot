# Composables

This directory contains Vue 3 composables for reusable logic.

## Usage

Composables are functions that encapsulate reactive state and logic, making them reusable across components.

Example:

```typescript
// useCounter.ts
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;

  return {
    count,
    increment,
    decrement,
  };
}
```
