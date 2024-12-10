import { Header } from './Header';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Widgets/Header',
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {};
