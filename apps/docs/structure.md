# RNC-Theme Documentation Structure

## Folder Tree Structure

```
src/
├── assets/
│   ├── logo.webp
│   ├── houston.webp
│   └── components/
│       ├── accordion-demo.gif
│       ├── button-variants.png
│       ├── theme-switching.gif
│       └── component-previews/
├── content/
│   └── docs/
│       ├── index.mdx                    # Homepage
│       ├── getting-started/
│       │   ├── installation.mdx
│       │   ├── quick-start.mdx
│       │   ├── setup-guide.mdx
│       │   └── migration.mdx
│       ├── theming/
│       │   ├── overview.mdx
│       │   ├── theme-provider.mdx
│       │   ├── custom-themes.mdx
│       │   ├── theme-registry.mdx
│       │   ├── dark-light-mode.mdx
│       │   └── theme-switching.mdx
│       ├── hooks/
│       │   ├── overview.mdx
│       │   ├── use-themed-styles.mdx
│       │   └── use-hide-on-scroll.mdx
│       ├── components/
│       │   ├── overview.mdx
│       │   ├── layout/
│       │   │   ├── box.mdx
│       │   │   ├── stack.mdx
│       │   │   └── container.mdx
│       │   ├── forms/
│       │   │   ├── button.mdx
│       │   │   ├── input.mdx
│       │   │   ├── checkbox.mdx
│       │   │   ├── radio.mdx
│       │   │   ├── switcher.mdx
│       │   │   ├── slider.mdx
│       │   │   ├── form-control.mdx
│       │   │   ├── date-picker.mdx
│       │   │   └── combobox.mdx
│       │   ├── data-display/
│       │   │   ├── avatar.mdx
│       │   │   ├── badge.mdx
│       │   │   ├── card.mdx
│       │   │   ├── table.mdx
│       │   │   ├── list.mdx
│       │   │   ├── rating.mdx
│       │   │   └── typography.mdx
│       │   ├── feedback/
│       │   │   ├── spinner.mdx
│       │   │   ├── skeleton.mdx
│       │   │   ├── progress.mdx
│       │   │   ├── toast.mdx
│       │   │   └── tooltip.mdx
│       │   ├── navigation/
│       │   │   ├── fab.mdx
│       │   │   └── divider.mdx
│       │   ├── overlay/
│       │   │   ├── modal.mdx
│       │   │   ├── bottom-sheet.mdx
│       │   │   └── portal.mdx
│       │   ├── media/
│       │   │   ├── image-carousel.mdx
│       │   │   └── calendar.mdx
│       │   └── disclosure/
│       │       ├── accordion.mdx
│       │       └── scroll.mdx
│       ├── internationalization/
│       │   ├── overview.mdx
│       │   ├── setup.mdx
│       │   ├── supported-languages.mdx
│       │   └── custom-translations.mdx
│       ├── guides/
│       │   ├── styling-guide.mdx
│       │   ├── responsive-design.mdx
│       │   ├── accessibility.mdx
│       │   ├── performance.mdx
│       │   ├── testing.mdx
│       │   ├── best-practices.mdx
│       │   └── troubleshooting.mdx
│       ├── examples/
│       │   ├── basic-app.mdx
│       │   ├── theme-switching-app.mdx
│       │   ├── form-examples.mdx
│       │   ├── dashboard-layout.mdx
│       │   └── component-showcase.mdx
│       ├── api-reference/
│       │   ├── theme-types.mdx
│       │   ├── component-props.mdx
│       │   ├── hook-apis.mdx
│       │   └── utility-functions.mdx
│       └── migration/
│           ├── from-v0-to-v1.mdx
│           └── breaking-changes.mdx
├── components/
│   ├── ComponentDemo.astro
│   ├── PropsTable.astro
│   ├── CodeBlock.astro
│   ├── ThemePreview.astro
│   └── InteractiveExample.astro
└── styles/
    ├── global.css
    └── components.css
```

## Astro Config Structure

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    starlight({
      title: 'RNC-Theme Documentation',
      description: 'Complete theming solution for React Native applications',
      logo: {
        src: './src/assets/logo.webp',
        replacesTitle: true,
      },
      customCss: ['./src/styles/global.css'],
      social: {
        github: 'https://github.com/masumrpg/react-native-components',
        discord: 'https://discord.gg/your-discord',
      },
      editLink: {
        baseUrl: 'https://github.com/masumrpg/react-native-components/edit/main/apps/docs/',
      },
      sidebar: [
        {
          label: '🚀 Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Setup Guide', slug: 'getting-started/setup-guide' },
            { label: 'Migration', slug: 'getting-started/migration' },
          ],
        },
        {
          label: '🎨 Theming',
          items: [
            { label: 'Overview', slug: 'theming/overview' },
            { label: 'Theme Provider', slug: 'theming/theme-provider' },
            { label: 'Custom Themes', slug: 'theming/custom-themes' },
            { label: 'Theme Registry', slug: 'theming/theme-registry' },
            { label: 'Dark/Light Mode', slug: 'theming/dark-light-mode' },
            { label: 'Theme Switching', slug: 'theming/theme-switching' },
          ],
        },
        {
          label: '🪝 Hooks',
          items: [
            { label: 'Overview', slug: 'hooks/overview' },
            { label: 'useThemedStyles', slug: 'hooks/use-themed-styles' },          ],
        },
        {
          label: '🧩 Components',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'components/overview' },
            {
              label: 'Layout',
              collapsed: true,
              items: [
                { label: 'Box', slug: 'components/layout/box' },
                { label: 'Stack', slug: 'components/layout/stack' },
                { label: 'Container', slug: 'components/layout/container' },
              ],
            },
            {
              label: 'Forms',
              collapsed: true,
              items: [
                { label: 'Button', slug: 'components/forms/button' },
                { label: 'Input', slug: 'components/forms/input' },
                { label: 'Checkbox', slug: 'components/forms/checkbox' },
                { label: 'Radio', slug: 'components/forms/radio' },
                { label: 'Switcher', slug: 'components/forms/switcher' },
                { label: 'Slider', slug: 'components/forms/slider' },
                { label: 'Form Control', slug: 'components/forms/form-control' },
                { label: 'Date Picker', slug: 'components/forms/date-picker' },
                { label: 'Combobox', slug: 'components/forms/combobox' },
              ],
            },
            {
              label: 'Data Display',
              collapsed: true,
              items: [
                { label: 'Avatar', slug: 'components/data-display/avatar' },
                { label: 'Badge', slug: 'components/data-display/badge' },
                { label: 'Card', slug: 'components/data-display/card' },
                { label: 'Table', slug: 'components/data-display/table' },
                { label: 'List', slug: 'components/data-display/list' },
                { label: 'Rating', slug: 'components/data-display/rating' },
                { label: 'Typography', slug: 'components/data-display/typography' },
              ],
            },
            {
              label: 'Feedback',
              collapsed: true,
              items: [
                { label: 'Spinner', slug: 'components/feedback/spinner' },
                { label: 'Skeleton', slug: 'components/feedback/skeleton' },
                { label: 'Progress', slug: 'components/feedback/progress' },
                { label: 'Toast', slug: 'components/feedback/toast' },
                { label: 'Tooltip', slug: 'components/feedback/tooltip' },
              ],
            },
            {
              label: 'Navigation',
              collapsed: true,
              items: [
                { label: 'FAB', slug: 'components/navigation/fab' },
                { label: 'Divider', slug: 'components/navigation/divider' },
              ],
            },
            {
              label: 'Overlay',
              collapsed: true,
              items: [
                { label: 'Modal', slug: 'components/overlay/modal' },
                { label: 'Bottom Sheet', slug: 'components/overlay/bottom-sheet' },
                { label: 'Portal', slug: 'components/overlay/portal' },
              ],
            },
            {
              label: 'Media',
              collapsed: true,
              items: [
                { label: 'Image Carousel', slug: 'components/media/image-carousel' },
                { label: 'Calendar', slug: 'components/media/calendar' },
              ],
            },
            {
              label: 'Disclosure',
              collapsed: true,
              items: [
                { label: 'Accordion', slug: 'components/disclosure/accordion' },
                { label: 'Scroll', slug: 'components/disclosure/scroll' },
              ],
            },
          ],
        },
        {
          label: '🌍 Internationalization',
          items: [
            { label: 'Overview', slug: 'internationalization/overview' },
            { label: 'Setup', slug: 'internationalization/setup' },
            { label: 'Supported Languages', slug: 'internationalization/supported-languages' },
            { label: 'Custom Translations', slug: 'internationalization/custom-translations' },
          ],
        },
        {
          label: '📚 Guides',
          items: [
            { label: 'Styling Guide', slug: 'guides/styling-guide' },
            { label: 'Responsive Design', slug: 'guides/responsive-design' },
            { label: 'Accessibility', slug: 'guides/accessibility' },
            { label: 'Performance', slug: 'guides/performance' },
            { label: 'Testing', slug: 'guides/testing' },
            { label: 'Best Practices', slug: 'guides/best-practices' },
            { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
          ],
        },
        {
          label: '💡 Examples',
          items: [
            { label: 'Basic App', slug: 'examples/basic-app' },
            { label: 'Theme Switching App', slug: 'examples/theme-switching-app' },
            { label: 'Form Examples', slug: 'examples/form-examples' },
            { label: 'Dashboard Layout', slug: 'examples/dashboard-layout' },
            { label: 'Component Showcase', slug: 'examples/component-showcase' },
          ],
        },
        {
          label: '📖 API Reference',
          items: [
            { label: 'Theme Types', slug: 'api-reference/theme-types' },
            { label: 'Component Props', slug: 'api-reference/component-props' },
            { label: 'Hook APIs', slug: 'api-reference/hook-apis' },
            { label: 'Utility Functions', slug: 'api-reference/utility-functions' },
          ],
        },
        {
          label: '🔄 Migration',
          items: [
            { label: 'From v0 to v1', slug: 'migration/from-v0-to-v1' },
            { label: 'Breaking Changes', slug: 'migration/breaking-changes' },
          ],
        },
      ],
    }),
  ],
});
```

## Content Patterns

### 1. Component Documentation Pattern

Setiap komponen harus mengikuti struktur ini:

```markdown
---
title: Component Name
description: Brief description of the component
---

# Component Name

Brief overview and use cases.

## Installation

```bash
npm install rnc-theme
```

## Import

```tsx
import { ComponentName } from 'rnc-theme';
```

## Basic Usage

<ComponentDemo>
```tsx
// Basic example
```
</ComponentDemo>

## Props

<PropsTable component="ComponentName" />

## Variants

### Variant 1
Description and example

### Variant 2
Description and example

## Theming

How to customize the component with themes.

## Accessibility

Accessibility features and best practices.

## Examples

### Example 1: Basic Usage
### Example 2: Advanced Usage
### Example 3: Custom Styling

## API Reference

Detailed API documentation.
```

### 2. Guide Documentation Pattern

```markdown
---
title: Guide Title
description: What this guide covers
---

# Guide Title

## Overview

What you'll learn in this guide.

## Prerequisites

What you need before starting.

## Step-by-Step Instructions

### Step 1: Title
Detailed instructions with code examples.

### Step 2: Title
Detailed instructions with code examples.

## Best Practices

Recommended approaches and patterns.

## Common Pitfalls

What to avoid and how to fix common issues.

## Next Steps

What to read next.
```

### 3. API Reference Pattern

```markdown
---
title: API Name
description: API reference documentation
---

# API Name

## Overview

Brief description of the API.

## Type Definitions

```typescript
// Type definitions
```

## Methods/Properties

### Method Name

**Signature:** `methodName(params): ReturnType`

**Description:** What the method does.

**Parameters:**
- `param1` (Type): Description
- `param2` (Type): Description

**Returns:** Description of return value

**Example:**
```typescript
// Usage example
```
```

## Professional Features

### 1. Interactive Components
- Live code playground dengan React Native Web
- Component preview dengan berbagai props
- Theme switcher untuk melihat komponen di berbagai tema

### 2. Search & Navigation
- Full-text search dengan Algolia DocSearch
- Keyboard shortcuts untuk navigasi cepat
- Breadcrumb navigation

### 3. Code Examples
- Syntax highlighting dengan Prism.js
- Copy-to-clipboard functionality
- Multiple language support (TypeScript, JavaScript)

### 4. Visual Assets
- Component screenshots dan GIFs
- Theme preview images
- Interactive demos

### 5. Developer Experience
- Auto-generated API docs dari TypeScript
- Version selector
- Dark/light mode toggle
- Mobile-responsive design

### 6. Content Organization
- Logical grouping berdasarkan fungsi komponen
- Progressive disclosure (basic → advanced)
- Cross-references antar halaman
- Related components suggestions

Struktur ini memberikan dokumentasi yang komprehensif, mudah dinavigasi, dan profesional untuk library rnc-theme Anda.