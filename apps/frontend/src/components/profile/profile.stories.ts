import ProfileImage from '@/assets/Ellipse 1.png'
import { Profile } from '@/components/profile'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Profile',
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const ProfileHeaderDefault: Story = {
  args: {
    email: 'j&johnson@gmail.com',
    imageSrc: ProfileImage,
    name: 'Ivan',
  },
}
