// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'RNC Theme',
      customCss: ['./src/styles/global.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/masumrpg/react-native-components',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {
              label: 'Installation',
              slug: 'getting-started/installation',
              badge: {
                text: 'Essential',
                variant: 'tip',
              },
            },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Setup Guide', slug: 'getting-started/setup-guide' },
          ],
        },
        {
          label: 'Theming',
          items: [
            { label: 'Overview', slug: 'theming/overview' },
            { label: 'Theme Provider', slug: 'theming/theme-provider' },
            { label: 'Custom Theme', slug: 'theming/custom-theme' },
            { label: 'Theme Registry', slug: 'theming/theme-registry' },
            {
              label: 'Theme Switching',
              slug: 'theming/theme-switching',
              badge: { text: 'Special', variant: 'note' },
            },
          ],
        },
        {
          label: 'Hooks',
          items: [
            // { label: 'Overview', slug: 'hooks/overview' },
            { label: 'useTheme', slug: 'hooks/use-theme' },
            { label: 'useThemeStyle', slug: 'hooks/use-themed-styles' },
            { label: 'useHideOnScroll', slug: 'hooks/use-hide-on-scroll' },
          ],
        },
        {
          label: 'Components',
          collapsed: false,
          items: [
            { label: 'Demo', slug: 'components/demo' },
            {
              label: 'Layout',
              items: [
                { label: 'HStack', slug: 'components/layout/hstack' },
                { label: 'VStack', slug: 'components/layout/vstack' },
                { label: 'ZStack', slug: 'components/layout/zstack' },
                { label: 'Box', slug: 'components/layout/box' },
                { label: 'Center', slug: 'components/layout/center' },
                { label: 'Grid', slug: 'components/layout/grid' },
              ],
            },
            {
              label: 'Form',
              collapsed: false,
              items: [
                {
                  label: 'Button',
                  slug: 'components/form/button',
                },
                { label: 'Input', slug: 'components/form/input' },
                { label: 'Checkbox', slug: 'components/form/checkbox' },
                { label: 'Radio', slug: 'components/form/radio' },
                { label: 'Switcher', slug: 'components/form/switcher' },
                { label: 'Slider', slug: 'components/form/slider' },
                { label: 'Form Control', slug: 'components/form/form-control' },
                { label: 'Date Picker', slug: 'components/form/date-picker' },
                { label: 'Combobox', slug: 'components/form/combobox' },
              ],
            },
            {
              label: 'Data Display',
              collapsed: false,
              items: [
                { label: 'Avatar', slug: 'components/data-display/avatar' },
                { label: 'Badge', slug: 'components/data-display/badge' },
                { label: 'Card', slug: 'components/data-display/card' },
                { label: 'Table', slug: 'components/data-display/table' },
                { label: 'List', slug: 'components/data-display/list' },
                { label: 'Rating', slug: 'components/data-display/rating' },
                {
                  label: 'Typography',
                  slug: 'components/data-display/typography',
                },
              ],
            },
            {
              label: 'Feedback',
              collapsed: false,
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
              items: [
                { label: 'Fab', slug: 'components/navigation/fab' },
                { label: 'Divider', slug: 'components/navigation/divider' },
              ],
            },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Provider', slug: 'api/provider' },
            { label: 'Theme', slug: 'api/theme' },
            { label: 'Registry', slug: 'api/registry' },
            { label: 'Theme Switcher', slug: 'api/theme-switcher' },
          ],
        },
        // {
        //   label: 'Data Display',
        //   items: [
        //     { label: 'Avatar', slug: 'data-display/avatar' },
        //     { label: 'Badge', slug: 'data-display/badge' },
        //     { label: 'Card', slug: 'data-display/card' },
        //     { label: 'Table', slug: 'data-display/table' },
        //     { label: 'List', slug: 'data-display/list' },
        //     { label: 'Rating', slug: 'data-display/rating' },
        //     { label: 'Typography', slug: 'data-display/typography' },
        //   ],
        // },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});