import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
// eslint-disable-next-line @nx/enforce-module-boundaries

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
    // (Story: StoryFn): ReactElement => SbRouterDecorator(Story),
  ],
};

export default preview;
