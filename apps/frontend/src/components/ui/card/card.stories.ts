import { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['article', 'div', 'section', 'span'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Component/Card',
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardDefault: Story = {
  args: {
    as: 'div',
    children: 'some default text',
  },
};
