import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Preview, StoryFn } from '@storybook/react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { GlobalStoreContextProvider } from '@wflow-front/shared';
import { JSX } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { SbDecorator } from '../src/shared/src/lib/config/storybook/RouterDecorator';

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
