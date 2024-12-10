import { Meta, type StoryObj } from '@storybook/react';
import { ThemeSwitcher } from '@wflow-front/features';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  title: 'Features/ThemeSwitcher',
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('ThemeSwitcher'));
  },
};
