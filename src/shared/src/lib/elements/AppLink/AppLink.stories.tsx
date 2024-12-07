import { AppLink } from '../AppLink/AppLink';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AppLink> = {
  component: AppLink,
  title: 'Shared/AppLink',
  argTypes: {
    to: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    to: '/',
    children: 'Home',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Home/gi)).toBeTruthy();
  },
};
