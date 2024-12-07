import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, StoryFn } from '@storybook/react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SbRouterDecorator } from '@wflow-front/shared';
import { ReactElement } from 'react';

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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // (Story, args) => withSbTanstackRouter(Story, args),
    (Story: StoryFn): ReactElement => SbRouterDecorator(Story),
  ],
};

export default preview;
