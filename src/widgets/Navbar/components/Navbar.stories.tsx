import { IconComponent, NavbarLinksType, routes } from '@shared';
import { Meta, StoryObj } from '@storybook/react';
import { linkOptions } from '@tanstack/react-router';

import { Navbar } from './Navbar';

const testLinks: NavbarLinksType[] = [
  linkOptions({
    to: routes.main(),
    inActive: (
      <IconComponent
        name={'HomeIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'HomeIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Главная',
  }),
  linkOptions({
    to: routes.statistic(),
    inActive: (
      <IconComponent
        name={'StatisticIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'StatisticIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Статистика',
  }),
  linkOptions({
    to: routes.settings(),
    inActive: (
      <IconComponent
        name={'SettingsIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'SettingsIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Настройки',
  }),
];

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Widgets/Navbar',
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    links: testLinks,
  },
};
