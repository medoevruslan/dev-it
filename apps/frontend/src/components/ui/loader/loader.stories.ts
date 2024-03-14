import { Meta, StoryObj } from '@storybook/react';
import { Loader } from './loader';

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'Component/Loader',
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoaderDefault: Story = {};
