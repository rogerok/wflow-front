import { Meta, StoryObj } from '@storybook/react';
import { IconComponent } from './IconComponent';
import * as Icons from '../../assets/index';

const meta: Meta<typeof IconComponent> = {
  component: IconComponent,
  title: 'Shared/IconComponent',
};

export default meta;

type Story = StoryObj<typeof IconComponent>;

const iconsKeys = Object.keys(Icons);

export const IconsList: Story = {
  render: () => (
    <>
      {iconsKeys.map((iconName) => (
        <IconComponent
          key={iconName}
          name={iconName as keyof typeof Icons}
          size="sm"
        />
      ))}
    </>
  ),
};

export const SmIcon: Story = {
  args: {
    name: 'SunIcon',
    size: 'sm',
  },
};

export const MdIcon: Story = {
  args: {
    name: 'MoonIcon',
    size: 'md',
  },
};

export const LgIcon: Story = {
  args: {
    name: 'LogoIcon',
    size: 'md',
  },
};
export const Clickable: Story = {
  args: {
    name: 'LogoIcon',
    size: 'md',
    onClick: () => console.log('onClick'),
  },
};
