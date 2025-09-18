<template>
  <div class="home">
    <h1>Welcome to PantryPilot</h1>
    <p>Your smart pantry management solution</p>
    <div class="actions">
      <router-link to="/login" class="btn btn-primary">Login</router-link>
      <router-link to="/dashboard" class="btn btn-secondary">Dashboard</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home view component
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.home h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.home p {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}
</style>
