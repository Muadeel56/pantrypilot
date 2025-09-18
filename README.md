# 🥬 PantryPilot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Muadeel56/pantrypilot/actions/workflows/ci.yml/badge.svg)](https://github.com/Muadeel56/pantrypilot/actions/workflows/ci.yml)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

> A modern, intuitive pantry management application built with Vue.js 3 and TypeScript. Keep track of your food inventory, monitor expiry dates, and reduce food waste with smart notifications.

## 🌟 Vision

PantryPilot aims to revolutionize how households manage their food inventory. Our vision is to create a seamless, intelligent system that helps users:

- **Reduce Food Waste**: Smart expiry tracking and notifications prevent food from going bad
- **Optimize Shopping**: Know exactly what you have and what you need before heading to the store
- **Save Money**: Avoid duplicate purchases and make the most of what you already own
- **Eat Healthier**: Track your inventory to plan better meals and maintain a balanced diet

## ✨ Features

### Current Features

- 📊 **Dashboard Overview**: Real-time statistics on total items, expiring items, and low stock
- 📝 **Item Management**: Add, edit, and remove pantry items with detailed information
- 📅 **Expiry Tracking**: Monitor expiration dates with visual indicators
- 📍 **Location Organization**: Organize items by storage location (Refrigerator, Pantry, etc.)
- 🏷️ **Category System**: Categorize items for better organization
- 📈 **Activity Feed**: Track recent changes and activities
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

### Planned Features

- 🔔 **Smart Notifications**: Email and push notifications for expiring items
- 🛒 **Shopping Lists**: Generate shopping lists based on low stock and meal planning
- 📊 **Analytics**: Insights into consumption patterns and waste reduction
- 🍽️ **Recipe Integration**: Suggest recipes based on available ingredients
- 👥 **Multi-user Support**: Family sharing and collaborative management
- 📱 **Mobile App**: Native mobile applications for iOS and Android

## 🛠️ Tech Stack

### Frontend

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Vue Router** - Official router for Vue.js applications
- **Pinia** - Intuitive state management for Vue

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS Variables** - Brand-consistent color system
- **Responsive Design** - Mobile-first approach

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking and compilation

### Build & Deployment

- **Vite Build** - Optimized production builds
- **Modern JavaScript** - ES modules and modern syntax

## 🎨 Color Palette

PantryPilot uses a carefully crafted color palette inspired by fresh, natural ingredients:

### Primary Colors

- **Fresh Basil** `#4a7c59` - Primary green for main actions and branding
- **Fresh Basil Light** `#6b9b7a` - Lighter variant for hover states
- **Fresh Basil Dark** `#3a5c47` - Darker variant for pressed states

### Accent Colors

- **Lemon Zest** `#f4d03f` - Bright yellow for highlights and warnings
- **Lemon Zest Light** `#f7d966` - Lighter variant for subtle accents
- **Lemon Zest Dark** `#e6c23a` - Darker variant for emphasis

### Supporting Colors

- **Sage** `#9caf88` - Muted green for secondary elements
- **Cream** `#f8f6f0` - Warm background color
- **Charcoal** `#2c3e50` - Primary text color
- **Warm Gray** `#6c757d` - Secondary text and borders

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pantrypilot.git
   cd pantrypilot
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Check for linting errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
pantrypilot/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other assets
│   ├── components/        # Reusable Vue components
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia state management
│   ├── styles/           # Global styles and theme
│   ├── views/            # Page components
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository** and create a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards
   - Use TypeScript for type safety
   - Follow Vue.js best practices
   - Write meaningful commit messages
   - Add tests for new features

3. **Test your changes**

   ```bash
   npm run lint:check
   npm run format:check
   npm run build
   ```

4. **Submit a pull request** with a clear description of your changes

### Coding Standards

- **TypeScript**: Use strict typing and avoid `any` types
- **Vue.js**: Follow Composition API patterns and use `<script setup>`
- **Styling**: Use Tailwind CSS classes and custom CSS variables
- **Naming**: Use descriptive, camelCase names for variables and functions
- **Comments**: Document complex logic and public APIs

### Issue Guidelines

- Use the issue templates for bug reports and feature requests
- Provide clear reproduction steps for bugs
- Include screenshots or videos when helpful
- Label issues appropriately (bug, enhancement, documentation, etc.)

## 📸 Screenshots

> **Note**: Screenshots will be added as the application develops.

### Dashboard View

![Dashboard Screenshot](docs/screenshots/dashboard.png)
_Main dashboard showing inventory statistics and recent activity_

### Item Management

![Item Management Screenshot](docs/screenshots/item-management.png)
_Add and edit pantry items with detailed information_

### Mobile View

![Mobile Screenshot](docs/screenshots/mobile.png)
_Responsive design optimized for mobile devices_

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool
- **Community Contributors** - For their valuable feedback and contributions

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/pantrypilot/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/pantrypilot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pantrypilot/discussions)
- **Email**: support@pantrypilot.com

---

**Made with ❤️ by the PantryPilot Team**
