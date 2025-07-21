---
name: 🐛 Bug Report
about: Report a bug or issue found
title: '[BUG] '
labels: ['bug', 'needs triage']
assignees: ''
---

# 🐛 Bug Report

## 📝 Description

<!-- Provide a clear and concise description of the bug found -->

### Bug Summary
<!-- Explain the bug in 1-2 sentences -->

### Detailed Description
<!-- Provide a more detailed explanation of the problem -->

## 🔄 Steps to Reproduce

<!-- Provide steps to reproduce the bug -->

1. Open application/component...
2. Click on...
3. Scroll to...
4. See error

### Minimal Reproducible Example
<!-- Provide minimal code example that can reproduce the bug -->

```tsx
import React from 'react';
import { ComponentName } from 'rnc-theme';

const BugExample = () => {
  return (
    <ComponentName
      // Props that cause the bug
    >
      Content
    </ComponentName>
  );
};

export default BugExample;
```

## ✅ Expected Behavior

<!-- Explain what should happen -->

## ❌ Actual Behavior

<!-- Explain what actually happens -->

## 🌍 Environment

<!-- Provide information about the environment where the bug occurs -->

### Project Environment
- **React Native Version**: 
- **RNC Theme Version**: 
- **Platform**: iOS / Android / Web
- **Device/Simulator**: 
- **OS Version**: 
- **Node Version**: 
- **Package Manager**: npm / yarn / bun

### Development Environment
- **IDE**: VS Code / WebStorm / Other
- **Metro Version**: 
- **Flipper Version**: 
- **Xcode Version** (iOS): 
- **Android Studio Version** (Android): 

### Dependencies
<!-- List dependencies that might be related -->
```json
{
  "react": "version",
  "react-native": "version",
  "rnc-theme": "version",
  "other-relevant-deps": "version"
}
```

## 📱 Screenshots/Videos

<!-- Include screenshots or videos showing the bug -->

### Bug Screenshot
<!-- Screenshot showing the bug -->

### Expected Screenshot
<!-- Screenshot showing expected behavior (if available) -->

### Video Demo
<!-- Video showing the bug in action -->

## 💻 Code Sample

### Component Implementation
<!-- Code of the problematic component -->

```tsx
// Paste problematic component code
```

### Theme Configuration
<!-- Theme configuration used -->

```tsx
// Paste theme configuration
```

### Full Example
<!-- Complete runnable example -->

```tsx
// Complete example showing the bug
```

## 📋 Error Logs

### Console Errors
<!-- Errors appearing in console -->

```
// Paste console errors here
```

### Metro Bundler Errors
<!-- Errors from Metro bundler -->

```
// Paste Metro errors here
```

### Native Errors
<!-- Errors from native side (iOS/Android) -->

```
// Paste native errors here
```

### Stack Trace
<!-- Complete stack trace if available -->

```
// Paste stack trace here
```

## 🔍 Additional Information

### Frequency
<!-- How often does this bug occur? -->
- [ ] Always (100%)
- [ ] Often (>50%)
- [ ] Sometimes (10-50%)
- [ ] Rarely (<10%)
- [ ] Once

### Severity
<!-- How severe is the impact of this bug? -->
- [ ] 🔥 Critical (app crashes, data loss)
- [ ] 🚨 High (major feature broken)
- [ ] ⚠️ Medium (minor feature broken)
- [ ] 📝 Low (cosmetic issue)

### Impact
<!-- Who is affected by this bug? -->
- [ ] All users
- [ ] Specific platform users (iOS/Android/Web)
- [ ] Users with specific configuration
- [ ] Only in development
- [ ] Only in production

### Workaround
<!-- Is there a workaround available? -->

### Related Issues
<!-- Links to related issues if any -->

### First Occurrence
<!-- When was this bug first discovered? -->

### Regression
<!-- Is this a regression from a previous version? -->
- [ ] Yes, this worked in version: ___
- [ ] No, this never worked
- [ ] Not sure

## 🧪 Testing

### Tested Scenarios
<!-- Scenarios that have been tested -->
- [ ] Fresh installation
- [ ] Existing project
- [ ] Different devices
- [ ] Different OS versions
- [ ] Different React Native versions

### Not Tested
<!-- Scenarios not yet tested -->
- [ ] iOS
- [ ] Android
- [ ] Web
- [ ] Different configurations

## 🤝 Contribution

### Willingness to Help
- [ ] I'm willing to help fix this bug
- [ ] I'm willing to help with testing
- [ ] I'm willing to help with reproduction
- [ ] I'm only reporting the bug

### Investigation Done
<!-- Investigation already performed -->
- [ ] Checked documentation
- [ ] Searched existing issues
- [ ] Tried different configurations
- [ ] Debugged the source code
- [ ] Created minimal reproduction

---

**Note**: Detailed and reproducible bug reports will help us fix issues faster. Thank you! 🙏