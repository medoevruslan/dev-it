import { Meta, StoryObj } from '@storybook/react';

import ProfileImage from '@/src/assets/person-outline.svg';
import { Dropdown, DropdownItem, DropdownItemSeparator } from './dropdown';
import { Icon } from '../icon';
import { Profile } from '../../profile';

const meta = {
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Dropdown',
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownWithoutIcons: Story = {
  render: () => {
    return (
      <Dropdown>
        <DropdownItem>
          <a href={'javascript:void;'}>Learn</a>
        </DropdownItem>
        <DropdownItemSeparator />
        <DropdownItem>
          <a href={'javascript:void;'}>Edit</a>
        </DropdownItem>
        <DropdownItemSeparator />
        <DropdownItem>
          <a href={'javascript:void;'}>Delete</a>
        </DropdownItem>
      </Dropdown>
    );
  },
};

export const DropdownWithIcons: Story = {
  render: () => {
    return (
      <Dropdown>
        <DropdownItem>
          <a href={'javascript:void;'}>
            <Icon height={20} name={'eye-outline'} width={20} />
            Learn
          </a>
        </DropdownItem>
        <DropdownItemSeparator />
        <DropdownItem>
          <a href={'javascript:void;'}>
            <Icon height={20} name={'edit'} width={20} />
            Edit
          </a>
        </DropdownItem>
        <DropdownItemSeparator />
        <DropdownItem>
          <a href={'javascript:void;'}>
            <Icon height={20} name={'delete'} width={20} />
            Delete
          </a>
        </DropdownItem>
      </Dropdown>
    );
  },
};

export const DropdownWithProfile: Story = {
  args: {
    headerItem: (
      <Profile
        email={'j&johnson@gmail.com'}
        imageSrc={ProfileImage}
        name={'Ivan'}
      />
    ),
    rootTrigger: (
      <img
        alt={'open dropdown'}
        aria-label={'open dropdown'}
        role={'button'}
        src={ProfileImage}
        width={'36px'}
      />
    ),
  },
  render: (args) => {
    return (
      <Dropdown {...args}>
        <DropdownItem>
          <a href={'javascript:void;'}>
            <Icon height={20} name={'edit'} width={20} />
            Edit
          </a>
        </DropdownItem>
        <DropdownItemSeparator />
        <DropdownItem>
          <a href={'javascript:void;'}>
            <Icon height={20} name={'delete'} width={20} />
            Delete
          </a>
        </DropdownItem>
      </Dropdown>
    );
  },
};
