import { Header } from './header';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Header,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  title: 'Component/Header',
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderDefault: Story = {};
