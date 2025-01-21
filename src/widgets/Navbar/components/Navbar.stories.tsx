import { NavbarLinks } from '@shared';
import { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Widgets/Navbar',
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    links: NavbarLinks,
  },
};
