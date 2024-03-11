import { Meta, StoryObj } from '@storybook/react'

import { SigninForm } from './'

const meta = {
  component: SigninForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Auth/SigninForm',
} satisfies Meta<typeof SigninForm>

export default meta

type Story = StoryObj<typeof meta>

export const SigninFormDefault: Story = {}
