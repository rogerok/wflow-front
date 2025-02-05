import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, StoryContext, StoryFn } from '@storybook/react';
import { JSX } from 'react';

import { SbDecorator, storybookRouter } from '../src/shared/config';
import { GlobalStoreContextProvider } from '../src/shared/stores';

const preview: Preview = {
  tags: ['autodocs', 'autodocs'],
  parameters: {
    controls: { expanded: true },
  },
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
        <GlobalStoreContextProvider router={storybookRouter}>
          <>{Story(args, args.context)}</>
        </GlobalStoreContextProvider>
      );
    },
  ],
};

export default preview;
