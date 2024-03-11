import { useState } from 'react'

import { Pagination, PostsPerPage } from '@/components/ui/pagination/pagination'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    onPageChange: { action: 'page is changed to:' },
  },
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const PaginationDefault: Story = {
  args: {
    currentPage: 1,
    totalCount: 55,
  },
}

export const PaginationInteractive: Story = {
  args: {
    currentPage: 1,
    totalCount: 55,
  },
  render: ({ totalCount }) => {
    const [current, setCurrent] = useState(1)

    return <Pagination currentPage={current} onPageChange={setCurrent} totalCount={totalCount} />
  },
}

export const PaginationWithPerPageSelect: Story = {
  args: {
    currentPage: 1,
    totalCount: 55,
  },
  render: ({ totalCount }) => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const totalCountCalculated = Math.ceil(totalCount / pageSize)

    const prePageOptions = ['10', '20', '30', '50', '100']

    return (
      <div>
        <Typography style={{ marginBottom: '20px', textAlign: 'center' }} variant={'h4'}>
          Total pages count is: {totalCount}
        </Typography>
        <Pagination
          currentPage={current}
          onPageChange={setCurrent}
          totalCount={totalCountCalculated}
        >
          <PostsPerPage onChange={value => setPageSize(Number(value))} options={prePageOptions} />
        </Pagination>
      </div>
    )
  },
}
