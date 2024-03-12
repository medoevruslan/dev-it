import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Modal } from './modal';
import { Typography } from '../typography';
import { Select, SelectOption } from '../select';
import { Input } from '../input';
import { CheckboxInput } from '../checkbox';

const meta = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Modal',
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalDefault: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant={'outlined'}>
          Open modal
        </Button>
        <Modal onClose={() => setOpen(false)} open={open} title={'Title'}>
          <Typography className={'mb-10'} variant={'body1'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniamdsa
          </Typography>
          <Select className={'w-full mb-2.5'}>
            <SelectOption value={'opt1'}>opt1</SelectOption>
            <SelectOption value={'opt2'}>opt2</SelectOption>
            <SelectOption value={'opt3'}>opt3</SelectOption>
          </Select>
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <CheckboxInput label={'Check-box'} className={'mb-8'} />
        </Modal>
      </>
    );
  },
};

export const ModalWithButtons: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant={'outlined'}>
          Open modal
        </Button>
        <Modal
          onClose={() => setOpen(false)}
          open={open}
          className={'w-[500px]'}
          title={'Title'}
        >
          <Select className={'w-full mb-2.5'}>
            <SelectOption value={'opt1'}>opt1</SelectOption>
            <SelectOption value={'opt2'}>opt2</SelectOption>
            <SelectOption value={'opt3'}>opt3</SelectOption>
          </Select>
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <Input
            label={'input'}
            placeholder={'Your input'}
            className={'w-full mb-4'}
          />
          <CheckboxInput label={'Check-box'} className={'mt-8'} />
          <footer className={'flex items-center justify-between pt-11 pb-9'}>
            <Button variant={'secondary'}>Button secondary</Button>
            <Button variant={'primary'}>Button primary</Button>
          </footer>
        </Modal>
      </>
    );
  },
};
