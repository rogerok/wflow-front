import { Meta, StoryObj } from '@storybook/react';
import { IconComponent } from './IconComponent';
import * as Icons from '../../assets/index';
import { HStack } from '../HStack/HStack';
import { CssColorsVarsConstant } from '../../store/theme/constants';

const iconsKeys = Object.keys(Icons);

const meta: Meta<typeof IconComponent> = {
  component: IconComponent,
  title: 'Shared/IconComponent',
  argTypes: {
    name: {
      options: iconsKeys,
      control: { type: 'select' },
    },
    color: {
      options: Object.values(CssColorsVarsConstant),
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconComponent>;

export const IconsList: Story = {
  render: () => (
    <HStack gap={'16'}>
      {iconsKeys.map((iconName) => (
        <IconComponent
          key={iconName}
          name={iconName as keyof typeof Icons}
          size="sm"
        />
      ))}
    </HStack>
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