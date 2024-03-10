import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'body1',
        'body2',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'link1',
        'link2',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Component/Typography',
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    children: 'Typography h1',
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Typography h2',
    variant: 'h2',
  },
};

export const H3: Story = {
  args: {
    children: 'Typography h3',
    variant: 'h3',
  },
};

export const Body1: Story = {
  args: {
    children: 'Typography body1',
    variant: 'body1',
  },
};

export const Body2: Story = {
  args: {
    children: 'Typography body2',
    variant: 'body2',
  },
};

export const Subtitle1: Story = {
  args: {
    children: 'Typography subtitle1',
    variant: 'subtitle1',
  },
};

export const Subtitle2: Story = {
  args: {
    children: 'Typography subtitle2',
    variant: 'subtitle2',
  },
};

export const Caption: Story = {
  args: {
    children: 'Typography caption',
    variant: 'caption',
  },
};

export const Overline: Story = {
  args: {
    children: 'Typography overline',
    variant: 'overline',
  },
};

export const Link1: Story = {
  args: {
    children: 'Typography link1',
    variant: 'link1',
  },
};

export const Link2: Story = {
  args: {
    children: 'Typography link2',
    variant: 'link2',
  },
};
