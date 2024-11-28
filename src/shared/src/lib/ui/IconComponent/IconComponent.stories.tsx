import { Meta, StoryObj } from '@storybook/react';
import { IconComponent } from './IconComponent';

const meta: Meta<typeof IconComponent> = {
  component: IconComponent,
  title: 'Shared/Button',
};

export default meta;

type Story = StoryObj<typeof IconComponent>;

export const Primary: Story = {};
