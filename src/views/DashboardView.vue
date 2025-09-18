<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <nav class="dashboard-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </nav>
    </header>
    
    <main class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Items</h3>
          <p class="stat-number">{{ store.totalItems }}</p>
        </div>
        <div class="stat-card">
          <h3>Expiring Soon</h3>
          <p class="stat-number">{{ store.expiringItems }}</p>
        </div>
        <div class="stat-card">
          <h3>Low Stock</h3>
          <p class="stat-number">{{ store.lowStockItems }}</p>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <ul class="activity-list">
          <li v-for="activity in store.recentActivity" :key="activity.id" class="activity-item">
            <span class="activity-time">{{ activity.time }}</span>
            <span class="activity-description">{{ activity.description }}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePantryStore } from '@/stores/pantry'

const store = usePantryStore()
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.dashboard-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin: 0;
}

.dashboard-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #ecf0f1;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.recent-activity {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-activity h2 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  color: #7f8c8d;
  font-size: 0.9rem;
  min-width: 80px;
}

.activity-description {
  color: #2c3e50;
}
</style>
