import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'ui/TextArea',
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

type Story = StoryObj<typeof TextArea>;

export const TextAreaStory: Story = {
  render: (args) => {
    return (
      <TextArea
        onChange={args.onChange}
        value={args.value}
        label={args.label}
      />
    );
  },

  play: async ({ canvasElement }): Promise<void> => {
    const canvas = within(canvasElement);
    const input = await canvas.getByRole('textbox');

    await userEvent.type(input, ' new text');
  },
};

export const TextAreaWithError: Story = {
  args: {
    error: 'Fill the input',
    resizable: false,
  },
};
