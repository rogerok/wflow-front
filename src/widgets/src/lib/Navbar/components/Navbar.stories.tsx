import { Navbar } from './Navbar';
import { Meta, StoryObj } from '@storybook/react';
import { IconComponent, NavbarLinksType, routes } from '@wflow-front/shared';
import { linkOptions } from '@tanstack/react-router';

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
    to: '/some-where',
    inActive: (
      <IconComponent
        name={'TimerIcon'}
        size={'sm'}
        color={'basic-secondary-4'}
      />
    ),
    active: (
      <IconComponent
        name={'TimerIconFilled'}
        size={'sm'}
        color={'brand-primary'}
      />
    ),
    label: 'Что-нибудь',
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
