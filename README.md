# React Native Components Theme

[![npm version](https://badge.fury.io/js/rnc-theme.svg)](https://badge.fury.io/js/rnc-theme)
![npm downloads](https://img.shields.io/npm/dt/rnc-theme)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Optimized-61DAFB.svg)](https://reactnative.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A comprehensive React Native UI component library and theme system designed to accelerate your mobile application development. With a focus on customization, performance, and exceptional developer experience.

## ✨ Key Features

### 🌓 Dynamic Theme Switching
Seamlessly switch between light and dark modes, or create your own custom themes.

### 🔒 Type-Safe
Complete TypeScript support with comprehensive type definitions for a safe development experience.

### 🎨 Highly Customizable
Easily customize every aspect of components using a flexible theme system.

### ⚡ React Native Optimized
Built specifically for React Native with optimal performance and perfect native experience.

### 💾 Persistent Storage
Automatically saves user theme preferences for consistent experience.

### 🎯 Multiple Presets
Comes with various built-in theme presets that are ready to use and customizable.

## 🚀 Installation

```bash
npm install rnc-theme
# or
yarn add rnc-theme
```

## 📖 Quick Start

```jsx
import React from 'react';
import { View } from 'react-native';
import { RNCProvider, Button, Typography } from 'rnc-theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
		<GestureHandlerRootView>
			<RNCProvider>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Typography variant="h1">Welcome!</Typography>
					<Button onPress={() => console.log('Button pressed!')}>
						<Typography color="white">Press Me</Typography>
					</Button>
				</View>
			</RNCProvider>
		</GestureHandlerRootView>
  );
};

export default App;
```

## 📦 30+ UI Components Ready to Use

### 🔘 Button & FAB
Customizable buttons with various variants, sizes, and Floating Action Button.

### 📝 Typography
Complete typography system with various heading, body, and caption variants.

### 📋 Form Controls
Input, Checkbox, Radio, Switcher, Toggle, Slider, and integrated Form Control.

### 🏗️ Layout & Navigation
Card, Divider, Layout components, Modal, Bottom Sheet, and Accordion.

### 📊 Data Display
Table, Badge, Avatar, Progress, Rating, and Skeleton loading.

### 💬 Feedback & Interaction
Toast notifications, Tooltip, Spinner, and various other interactive components.

### 🖼️ Media & Content
Image Carousel, Calendar, Date Picker for displaying multimedia content.

### 🚀 Advanced Features
Combobox, Scroll components, and Internationalization (i18n) support.

## 📚 Documentation

Visit our comprehensive documentation for detailed guides and examples:

### [🚀 Getting Started](https://rnc.masum.cloud/)
Complete guide to start using rnc-theme in your project.

### [🎨 Theming Guide](https://rnc.masum.cloud/)
Learn how to create and customize themes according to your brand.

### [🧩 Components](https://rnc.masum.cloud/)
Explore all available components with complete usage examples.

### [💡 Examples](https://rnc.masum.cloud/)
See real implementation examples and best practices.

## 🤝 Contributing

We warmly welcome contributions from the community! Please read our comprehensive contribution guidelines:

📋 **[Contributing Guide](CONTRIBUTING.md)** - Complete guide for contributing  
📜 **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community rules and ethics  
🔒 **[Security Policy](SECURITY.md)** - Security policy and vulnerability reporting  
🗺️ **[Roadmap](ROADMAP.md)** - Future development plans  
👥 **[Authors](AUTHORS.md)** - List of contributors and maintainers  
📝 **[Changelog](CHANGELOG.md)** - Version change history  

### Quick Start for Contributors

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/react-native-components.git`
3. **Install** dependencies: `bun install`
4. **Create** feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes and **test** thoroughly
6. **Commit** with conventional format: `git commit -m "feat: add amazing feature"`
7. **Push** to branch: `git push origin feature/amazing-feature`
8. **Create** Pull Request using the provided template

### How to Contribute

- 🐛 **Report Bugs**: Use [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- ✨ **Request Features**: Use [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- 💻 **Code Contributions**: Follow [development guidelines](CONTRIBUTING.md#development-guidelines)
- 📚 **Improve Documentation**: Any documentation improvements are highly appreciated
- 🎨 **Design & UX**: Help improve design system and user experience
- 🧪 **Testing**: Help test new features and bug fixes
- 🌍 **Translation**: Help translate documentation to other languages

## 📄 License

MIT - See [LICENSE](LICENSE) for details

---

Made with ❤️ for the React Native community