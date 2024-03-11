import ProfileImage from '@/src/assets/person-outline.svg';
import { Meta, StoryObj } from '@storybook/react';
import { Profile } from './profile';

const meta = {
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Profile',
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileHeaderDefault: Story = {
  args: {
    email: 'j&johnson@gmail.com',
    imageSrc: ProfileImage,
    name: 'Ivan',
  },
};
