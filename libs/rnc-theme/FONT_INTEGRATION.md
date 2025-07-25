# Font Integration Guide

This guide explains how to integrate custom fonts (especially Expo Google Fonts) with the RNC Theme system.

## Installation

First, install the required dependencies:

```bash
# For Expo Google Fonts (example with Poppins)
npm install @expo-google-fonts/poppins expo-font
# or
yarn add @expo-google-fonts/poppins expo-font

# For other font families, replace 'poppins' with your desired font:
# npm install @expo-google-fonts/roboto
# npm install @expo-google-fonts/inter
# npm install @expo-google-fonts/open-sans
```

## Basic Usage

### 1. Setup Font Loading

```tsx
import React from 'react';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { RNCProvider, fontUtils } from '@rnc/theme';

function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Create font configuration
  const fontConfig = fontUtils.createExpoFontConfig({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  return (
    <RNCProvider
      fontConfig={fontConfig}
      fontsLoaded={fontsLoaded}
      onFontLoadError={(error) => console.warn('Font loading error:', error)}
    >
      {/* Your app content */}
    </RNCProvider>
  );
}
```

### 2. Alternative Font Configuration

You can also create font config manually:

```tsx
import { fontUtils } from '@rnc/theme';

// Method 1: Using createFontConfig
const fontConfig = fontUtils.createFontConfig('Poppins', {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
});

// Method 2: Manual configuration
const fontConfig = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};
```

### 3. Using Typography Components

Once configured, all typography components will automatically use the custom fonts:

```tsx
import { Typography } from '@rnc/theme';

function MyComponent() {
  return (
    <>
      <Typography variant="heading">Heading with Poppins Bold</Typography>
      <Typography variant="title">Title with Poppins SemiBold</Typography>
      <Typography variant="subtitle">Subtitle with Poppins Medium</Typography>
      <Typography variant="body">Body text with Poppins Regular</Typography>
    </>
  );
}
```

## Advanced Usage

### Custom Theme with Fonts

You can also customize the theme to override specific typography variants:

```tsx
import { RNCProvider } from '@rnc/theme';

const customTheme = {
  typography: {
    heading: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '700',
      fontFamily: 'Poppins-Bold', // Override specific font
    },
  },
};

function App() {
  return (
    <RNCProvider
      customLightTheme={customTheme}
      fontConfig={fontConfig}
      fontsLoaded={fontsLoaded}
    >
      {/* Your app content */}
    </RNCProvider>
  );
}
```

### Font Loading States

You can access font loading state in your components:

```tsx
import { useTheme } from '@rnc/theme';

function MyComponent() {
  const { fontLoadingState } = useTheme();

  if (!fontLoadingState.loaded) {
    return <Text>Loading fonts...</Text>;
  }

  if (fontLoadingState.error) {
    return <Text>Font loading error: {fontLoadingState.error}</Text>;
  }

  return <Typography variant="body">Fonts loaded successfully!</Typography>;
}
```

## Font Weight Mapping

The system automatically maps font weights to the appropriate font families:

- `400` or `normal` → `regular` font
- `500` → `medium` font (fallback to `regular`)
- `600` → `semiBold` font (fallback to `medium` → `regular`)
- `700` or `bold` → `bold` font (fallback to `semiBold` → `medium` → `regular`)

## Error Handling

The system includes built-in error handling:

1. **Font Loading Timeout**: If fonts don't load within 5 seconds, it falls back to system fonts
2. **Missing Font Variants**: If a specific weight isn't available, it falls back to the next available weight
3. **Error Callbacks**: Use `onFontLoadError` to handle font loading errors

## Best Practices

1. **Preload Fonts**: Load fonts as early as possible in your app lifecycle
2. **Fallback Strategy**: Always provide fallback fonts for better user experience
3. **Performance**: Only load the font weights you actually use
4. **Testing**: Test your app with slow network conditions to ensure proper fallback behavior

## Troubleshooting

### Fonts Not Displaying

1. Check if `fontsLoaded` is `true`
2. Verify font names match exactly (case-sensitive)
3. Ensure fonts are properly imported from the font package

### Performance Issues

1. Reduce the number of font weights loaded
2. Use font display strategies for web platforms
3. Consider using system fonts for better performance

### TypeScript Issues

1. Ensure you're importing types from `@rnc/theme`
2. Check that your font config matches the `FontConfig` type
3. Verify theme customizations match the `Theme` type structure