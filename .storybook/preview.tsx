import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, StoryContext, StoryFn } from '@storybook/react';
import { JSX } from 'react';

import { GlobalStoreContextProvider, SbDecorator } from '../src/shared';

const preview: Preview = {
  tags: ['autodocs', 'autodocs'],
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    SbDecorator,
    (Story: StoryFn, args: StoryContext<{ [x: string]: any }>): JSX.Element => {
      return (
        <GlobalStoreContextProvider>
          <>{Story(args, args.context)}</>
        </GlobalStoreContextProvider>
      );
    },
  ],
};

export default preview;
