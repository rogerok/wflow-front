import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/shared/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/features/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/entities/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/widgets/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/pages/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
