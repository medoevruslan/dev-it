import { Table } from './';
import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../typography';
import { Icon } from '../icon';

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Table',
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const cols: string[] = Array.from(
  { length: 5 },
  (_, idx) => 'Name' + (idx + 1)
);

export const TableDefault: Story = {
  render: () => {
    const { Body, Cell, Head, HeadCell, Root, Row } = Table;

    return (
      <Root>
        <Head>
          <Row>
            {cols.map((col) => (
              <HeadCell key={col}>
                <Typography variant={'subtitle2'}>{col}</Typography>
              </HeadCell>
            ))}
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell className={'flex items-center gap-[10px]'}>
              <Typography variant={'body2'}>Name</Typography>
            </Cell>
            <Cell>
              <Typography variant={'body2'}>Name</Typography>
            </Cell>
            <Cell>
              <Typography variant={'body2'}>Name</Typography>
            </Cell>
            <Cell>
              <Typography variant={'body2'}>Name</Typography>
            </Cell>
            <Cell>
              <Icon
                className={
                  'cursor-pointer inline-block transition hover:text-accent-500 mr-[10px]'
                }
                height={15}
                name={'play-circle-icon'}
                width={15}
              />
              <Icon
                className={
                  'cursor-pointer inline-block transition hover:text-accent-500 mr-[10px]'
                }
                height={15}
                name={'edit'}
                width={15}
              />
              <Icon
                className={
                  'cursor-pointer inline-block transition hover:text-accent-500 mr-[10px]'
                }
                height={15}
                name={'delete'}
                width={15}
              />
            </Cell>
          </Row>
        </Body>
      </Root>
    );
  },
};
