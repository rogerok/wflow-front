import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'ui/Input',
  args: {
    label: 'Label text',
  },

  argTypes: {
    value: {
      control: 'text',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const InputStory: Story = {
  render: (args) => {
    return (
      <Input onChange={args.onChange} value={args.value} label={args.label} />
    );
  },

  play: async ({ canvasElement }): Promise<void> => {
    const canvas = within(canvasElement);
    const input = await canvas.getByRole('textbox');

    await userEvent.type(input, ' new text');
  },
};

export const InputWithError: Story = {
  args: {
    error: 'Fill the input',
  },
};
