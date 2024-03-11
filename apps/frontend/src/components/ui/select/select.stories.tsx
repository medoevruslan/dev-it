import { Meta, StoryObj } from '@storybook/react';

import { Select, SelectOption } from './';

const meta = {
  argTypes: {
    onValueChange: { action: 'value changed: ' },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Component/Select',
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;
export const SelectDefault: Story = {
  args: {
    disabled: false,
  },
  render: ({ disabled, onValueChange }) => {
    return (
      <Select
        open={true}
        disabled={disabled}
        name={'default-select'}
        onValueChange={onValueChange}
      >
        <SelectOption value={'1'}>Value: 1</SelectOption>
        <SelectOption value={'2'}>Value: 2</SelectOption>
        <SelectOption value={'3'}>Value: 3</SelectOption>
      </Select>
    );
  },
};
