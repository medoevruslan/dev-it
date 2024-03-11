import { Meta, StoryObj } from '@storybook/react'

import { SignupForm } from './'

const meta = {
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Auth/SignupForm',
} satisfies Meta<typeof SignupForm>

export default meta

type Story = StoryObj<typeof meta>

export const SignupFormDefault: Story = {}
