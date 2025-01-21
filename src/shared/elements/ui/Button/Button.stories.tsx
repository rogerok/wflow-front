import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Shared/Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'filled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Button/gi)).toBeTruthy();
  },
};
