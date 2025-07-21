# Contributing to React Native Components (RNC Theme)

Thank you for your interest in contributing to React Native Components! We greatly appreciate contributions from the community to make this library even better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reporting](#bug-reporting)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)
- [Testing](#testing)
- [Release Process](#release-process)

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code of ethics.

## How to Contribute

There are several ways to contribute:

### 🐛 Reporting Bugs
- Use GitHub Issues to report bugs
- Make sure the bug hasn't been reported before
- Provide detailed information and reproduction steps

### ✨ Proposing New Features
- Open a GitHub Issue with the "feature request" label
- Explain the use case and benefits of the feature
- Discuss with maintainers before starting implementation

### 🔧 Fixing Bugs or Adding Features
- Fork this repository
- Create a new branch for your changes
- Implement changes following the guidelines
- Create a Pull Request

### 📚 Improving Documentation
- Fix typos or errors in documentation
- Add better usage examples
- Translate documentation to other languages

## Development Environment Setup

### Prerequisites

- Node.js (version 18 or newer)
- Bun (recommended package manager)
- React Native development environment
- Git

### Installation

1. **Fork and Clone Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-components.git
   cd react-native-components
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Setup Development Environment**
   ```bash
   # Run example app for testing
   bun start
   
   # Or run documentation
   bun run docs:dev
   ```

4. **Build Libraries**
   ```bash
   bun run build
   ```

## Project Structure

```
react-native-components/
├── apps/
│   ├── docs/          # Astro documentation
│   └── example/       # Example React Native app
├── libs/
│   └── rnc-theme/     # Main library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # UI Components
│       │   │   ├── context/     # React Contexts
│       │   │   ├── hooks/       # Custom Hooks
│       │   │   ├── themes/      # Theme definitions
│       │   │   ├── types/       # TypeScript types
│       │   │   └── utils/       # Utility functions
│       │   └── index.ts
│       └── package.json
├── tools/
│   ├── scripts/       # Build and utility scripts
│   └── templates/     # Template files
└── package.json
```

## Development Guidelines

### 🎨 Coding Standards

1. **TypeScript**
   - Use TypeScript for all code
   - Define clear and comprehensive types
   - Avoid using `any`

2. **Naming Conventions**
   - Components: PascalCase (`Button`, `Typography`)
   - Files: kebab-case (`button.tsx`, `theme-provider.tsx`)
   - Variables/Functions: camelCase (`handlePress`, `isVisible`)
   - Constants: UPPER_SNAKE_CASE (`DEFAULT_THEME`, `MAX_WIDTH`)

3. **Component Structure**
   ```tsx
   // Import statements
   import React from 'react';
   import { View } from 'react-native';
   
   // Types
   interface ComponentProps {
     // props definition
   }
   
   // Component
   export const Component: React.FC<ComponentProps> = ({
     // destructured props
   }) => {
     // hooks
     // handlers
     // render
     return (
       <View>
         {/* JSX */}
       </View>
     );
   };
   
   // Default export
   export default Component;
   ```

4. **Styling**
   - Use the existing theme system
   - Avoid hardcoded values
   - Use `useThemedStyles` hook for styling

### 🧩 Component Guidelines

1. **Accessibility**
   - Add proper accessibility props
   - Use semantic elements
   - Test with screen readers

2. **Performance**
   - Use `React.memo` for expensive components
   - Optimize re-renders with `useCallback` and `useMemo`
   - Lazy load components if needed

3. **Props Design**
   - Create intuitive and consistent props
   - Use union types for variants
   - Provide sensible defaults

4. **Theme Integration**
   - All components must support theming
   - Use existing theme tokens
   - Create new theme tokens if needed

### 📝 Documentation

1. **JSDoc Comments**
   ```tsx
   /**
    * Button component with various styles and sizes
    * @param variant - Button style variant
    * @param size - Button size
    * @param onPress - Function called when button is pressed
    */
   ```

2. **Component README**
   - Each component folder should have usage examples
   - Document all props
   - Provide working code examples

## Pull Request Process

### 1. Preparation

- Make sure your branch is up-to-date with `main`
- Run tests and ensure they all pass
- Check linting with `bun run lint`
- Build project with `bun run build`

### 2. Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactoring
- `test`: Adding or fixing tests
- `chore`: Maintenance tasks

**Example:**
```
feat(button): add loading state support

Add loading prop to Button component that shows spinner
and disables interaction when true.

Closes #123
```

### 3. Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 4. Review Process

- Maintainer will review your PR
- Respond to feedback constructively
- Make requested changes
- PR will be merged after approval

## Bug Reporting

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Device: [e.g. iPhone 12, Samsung Galaxy S21]
 - OS: [e.g. iOS 15.0, Android 12]
 - React Native version: [e.g. 0.72.0]
 - Library version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

### Writing Tests

1. **Unit Tests**
   - Test component behavior
   - Test utility functions
   - Mock external dependencies

2. **Integration Tests**
   - Test component interactions
   - Test theme integration
   - Test accessibility

3. **Example Test**
   ```tsx
   import React from 'react';
   import { render, fireEvent } from '@testing-library/react-native';
   import { Button } from '../Button';
   
   describe('Button', () => {
     it('should call onPress when pressed', () => {
       const onPress = jest.fn();
       const { getByText } = render(
         <Button onPress={onPress}>Test Button</Button>
       );
       
       fireEvent.press(getByText('Test Button'));
       expect(onPress).toHaveBeenCalled();
     });
   });
   ```

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. Publish to npm
5. Update documentation

## 🤝 Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions
- **Discord**: Real-time chat (coming soon)

### Getting Help

- Check existing issues and documentation
- Search in discussions
- Create new issue with appropriate template

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License as this project.

---

**Thank you for contributing! 🎉**

Every contribution, no matter how small, means a lot to the React Native community. Let's build an amazing library together!