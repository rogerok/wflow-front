import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
