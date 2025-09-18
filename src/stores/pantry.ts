import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  location: string;
}

export interface Activity {
  id: string;
  time: string;
  description: string;
  type: 'added' | 'removed' | 'expired' | 'low_stock';
}

export const usePantryStore = defineStore('pantry', () => {
  // State
  const items = ref<PantryItem[]>([
    {
      id: '1',
      name: 'Milk',
      quantity: 2,
      unit: 'liters',
      expiryDate: '2024-01-15',
      category: 'Dairy',
      location: 'Refrigerator',
    },
    {
      id: '2',
      name: 'Bread',
      quantity: 1,
      unit: 'loaf',
      expiryDate: '2024-01-12',
      category: 'Bakery',
      location: 'Pantry',
    },
    {
      id: '3',
      name: 'Apples',
      quantity: 5,
      unit: 'pieces',
      expiryDate: '2024-01-20',
      category: 'Fruits',
      location: 'Refrigerator',
    },
  ]);

  const recentActivity = ref<Activity[]>([
    {
      id: '1',
      time: '2h ago',
      description: 'Added 2 liters of Milk to Refrigerator',
      type: 'added',
    },
    {
      id: '2',
      time: '1d ago',
      description: 'Bread is expiring soon (2 days left)',
      type: 'expired',
    },
    {
      id: '3',
      time: '2d ago',
      description: 'Used 1 loaf of Bread',
      type: 'removed',
    },
  ]);

  // Getters (computed)
  const totalItems = computed(() => items.value.length);

  const expiringItems = computed(() => {
    const today = new Date();
    const threeDaysFromNow = new Date(
      today.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    return items.value.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= threeDaysFromNow;
    }).length;
  });

  const lowStockItems = computed(() => {
    return items.value.filter(item => item.quantity <= 2).length;
  });

  const itemsByCategory = computed(() => {
    const categories: Record<string, PantryItem[]> = {};
    items.value.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category]!.push(item);
    });
    return categories;
  });

  // Actions
  const addItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem: PantryItem = {
      ...item,
      id: Date.now().toString(),
    };
    items.value.push(newItem);

    // Add activity
    recentActivity.value.unshift({
      id: Date.now().toString(),
      time: 'Just now',
      description: `Added ${item.quantity} ${item.unit} of ${item.name} to ${item.location}`,
      type: 'added',
    });
  };

  const removeItem = (id: string) => {
    const itemIndex = items.value.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      const item = items.value[itemIndex];
      if (item) {
        items.value.splice(itemIndex, 1);

        // Add activity
        recentActivity.value.unshift({
          id: Date.now().toString(),
          time: 'Just now',
          description: `Removed ${item.name} from ${item.location}`,
          type: 'removed',
        });
      }
    }
  };

  const updateItem = (id: string, updates: Partial<Omit<PantryItem, 'id'>>) => {
    const itemIndex = items.value.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      const currentItem = items.value[itemIndex];
      if (currentItem) {
        items.value[itemIndex] = { ...currentItem, ...updates };
      }
    }
  };

  const getItemById = (id: string) => {
    return items.value.find(item => item.id === id);
  };

  const getItemsByCategory = (category: string) => {
    return items.value.filter(item => item.category === category);
  };

  const getExpiringItems = (days: number = 3) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

    return items.value.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= futureDate;
    });
  };

  return {
    // State
    items,
    recentActivity,

    // Getters
    totalItems,
    expiringItems,
    lowStockItems,
    itemsByCategory,

    // Actions
    addItem,
    removeItem,
    updateItem,
    getItemById,
    getItemsByCategory,
    getExpiringItems,
  };
});
