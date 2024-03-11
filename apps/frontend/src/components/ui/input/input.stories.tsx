import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  argTypes: {
    onEnter: { action: 'on onter callback' },
    type: {
      control: { type: 'radio' },
      options: ['password', 'search'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Component/Input',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
  args: {
    label: 'input',
    placeholder: 'Input',
  },
}

export const InputError: Story = {
  args: {
    error: 'error!',
    label: 'input',
    placeholder: 'Input',
  },
}

export const InputPassword: Story = {
  args: {
    label: 'input',
    placeholder: 'Input',
    type: 'password',
  },
  render: ({ label, placeholder, type }) => {
    const [value, setValue] = useState('')

    return (
      <Input
        label={label}
        onChangeText={setValue}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    )
  },
}

export const InputSearch: Story = {
  argTypes: {
    clearInput: { action: 'input cleared' },
  },
  args: {
    label: 'input',
    placeholder: 'Input',
    type: 'search',
  },
  render: ({ label, placeholder, type }) => {
    const [value, setValue] = useState('')

    return (
      <Input
        clearInput={() => setValue('')}
        label={label}
        onChangeText={setValue}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    )
  },
}
