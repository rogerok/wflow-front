import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Typography } from './Typography';

const text = 'Lorem ipsum';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'ui/Typography',
  args: {
    size: 'md',
    variant: 'primary',
    weight: 'normal',
    align: 'left',
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: text,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(text)).toBeTruthy();
  },
};

export const Warn: Story = {
  render: (args) => <Typography {...args} />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(text)).toBeTruthy();
  },
};
