import '../src/app/styles/index.scss';

import { GlobalStoreContextProvider, SbDecorator } from '@shared';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, StoryFn } from '@storybook/react';
import { JSX } from 'react';

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
    SbDecorator,
    (Story: StoryFn): JSX.Element => {
      return (
        <GlobalStoreContextProvider>
          <Story />
        </GlobalStoreContextProvider>
      );
    },
  ],
};

export default preview;
