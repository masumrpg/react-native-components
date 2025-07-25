# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete contribution documentation
- Issue and pull request templates
- Security policy
- Code of conduct
- ✨ Custom font configuration support in `RNCProvider`
- 📚 Font configuration documentation and examples
- 🎨 `fontConfig`, `fontsLoaded`, and `onFontLoadError` props to `RNCProvider`
- 📖 Custom font setup guide with Expo Google Fonts integration

### Changed
- Improved project structure documentation
- 🔄 Enhanced `RNCProvider` with font loading capabilities
- 📚 Updated API documentation with new font-related props

### Deprecated
- Nothing

### Removed
- Nothing

### Fixed
- 🐛 Fixed theme persistence issue where only current theme mode was saved
- 🔧 Fixed `updateCustomTheme` to save both light and dark variants when preset is applied
- ✨ Added missing `fontFamily: 'System'` to all typography variants in preset themes

### Security
- Added security policy and guidelines

## [1.0.0] - 2025-07-15

### Added
- 🎉 Initial release of React Native Components (RNC Theme)
- 🌓 Dynamic theme switching (light/dark mode)
- 🔒 Complete TypeScript support
- 🎨 Highly customizable theme system
- ⚡ React Native optimized performance
- 💾 Persistent theme storage
- 🎯 Multiple built-in theme presets

#### Components
- **Button & FAB**: Customizable buttons with variants and Floating Action Button
- **Typography**: Complete typography system with heading, body, and caption variants
- **Form Controls**: Input, Checkbox, Radio, Switcher, Toggle, Slider, Form Control
- **Layout & Navigation**: Card, Divider, Layout, Modal, Bottom Sheet, Accordion
- **Data Display**: Table, Badge, Avatar, Progress, Rating, Skeleton loading
- **Feedback & Interaction**: Toast notifications, Tooltip, Spinner
- **Media & Content**: Image Carousel, Calendar, Date Picker
- **Advanced Features**: Combobox, Scroll components, i18n support

#### Theme System
- Pre-built light and dark themes
- Custom theme creation support
- Theme token system
- Runtime theme switching
- Persistent theme preferences

#### Developer Experience
- TypeScript definitions for all components
- Comprehensive documentation
- Example application
- Storybook integration (coming soon)

#### Accessibility
- Screen reader support
- Keyboard navigation
- ARIA labels and roles
- High contrast support

#### Performance
- Optimized for React Native
- Minimal bundle size impact
- Efficient re-rendering
- Memory leak prevention

#### Internationalization
- i18n support with i18n-js
- Multiple language support
- RTL layout support (coming soon)

### Technical Details
- **React Native**: 0.72+ support
- **TypeScript**: Full type safety
- **Dependencies**: Minimal external dependencies
- **Bundle Size**: < 50KB gzipped
- **Platform Support**: iOS, Android, Web (experimental)

---

## Format Changelog

### Guidelines for Maintainers

When adding new entries to the changelog:

1. **Use consistent formatting**
2. **Group changes by category**
3. **Provide clear and concise descriptions**
4. **Include breaking changes clearly**
5. **Link to relevant issues or PRs**

### Change Categories

- **Added**: New features
- **Changed**: Changes to existing features
- **Deprecated**: Features to be removed in future versions
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

### Entry Format

```markdown
### Added
- 🎉 New component: `ComponentName` with full TypeScript support
- ✨ New prop `propName` for `ComponentName` component
- 📚 Documentation for new feature

### Changed
- 🔄 **BREAKING**: `oldPropName` renamed to `newPropName` in `ComponentName`
- 🎨 Improved styling for `ComponentName`
- ⚡ Performance optimization for theme switching

### Fixed
- 🐛 Fixed issue where `ComponentName` didn't work on Android (#123)
- 🔧 Fixed TypeScript types for `PropName` (#124)

### Security
- 🔒 Fixed potential XSS vulnerability in `ComponentName`
```

### Emoji Guide

- 🎉 Major new features
- ✨ Minor new features
- 🔄 Breaking changes
- 🎨 UI/UX improvements
- ⚡ Performance improvements
- 🐛 Bug fixes
- 🔧 Technical fixes
- 📚 Documentation
- 🔒 Security
- 🧪 Testing
- 🏗️ Build/CI
- 🧹 Maintenance

### Versioning Guidelines

#### Major Version (X.0.0)
- Breaking changes
- Major new features
- Significant API changes
- Minimum version requirement changes

#### Minor Version (0.X.0)
- New features (backward compatible)
- New components
- New props or methods
- Deprecations

#### Patch Version (0.0.X)
- Bug fixes
- Security patches
- Documentation updates
- Performance improvements (non-breaking)

### Breaking Changes

When there are breaking changes, always include:

1. **Migration guide**
2. **Reason for change**
3. **Deprecation timeline**
4. **Before/after examples**

Example:

```markdown
### Changed
- 🔄 **BREAKING**: `Button` component prop `type` renamed to `variant`

  **Migration Guide:**
  ```tsx
  // Before
  <Button type="primary">Click me</Button>

  // After
  <Button variant="primary">Click me</Button>
  ```

  **Reason**: Better consistency with other components
  **Deprecated in**: v0.9.0
  **Removed in**: v1.0.0
```

---

## Links

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases](https://github.com/your-username/react-native-components/releases)

---

**Note**: For more detailed changelog, see [GitHub Releases](https://github.com/your-username/react-native-components/releases) or [commit history](https://github.com/your-username/react-native-components/commits/main).