import { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: 'Shared/Flex',
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
  args: {
    direction: 'row',
    gap: '8',
    fullWidth: true,
    align: 'center',
    flexJustify: 'between',
    wrap: 'wrap',
    children: (
      <>
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
        <div style={{ background: 'grey', width: '100px', height: '100px' }} />
      </>
    ),
  },
};
