import { Meta, type StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  title: 'Widgets/Header/ThemeSwitcher',
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('ThemeSwitcher'));
  },
};
