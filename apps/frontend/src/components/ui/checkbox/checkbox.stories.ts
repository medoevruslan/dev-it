import { Meta, StoryObj } from '@storybook/react'

import { CheckboxInput } from './'
const meta = {
  component: CheckboxInput,
  tags: ['autodocs'],
  title: 'Component/Checkbox',
} satisfies Meta<typeof CheckboxInput>

export default meta

type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  args: {
    disabled: false,
  },
}

export const CheckboxWithLabel: Story = {
  args: {
    disabled: false,
    label: 'default label',
  },
}
