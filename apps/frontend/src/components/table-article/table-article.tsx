import clsx from 'clsx';

import s from './table-deck.module.scss';

import { Table } from '@/src/components/ui/table';
import { Typography } from '@/src/components/ui/typography';

type Props = {
  className?: string;
  decks: any[];
  // decks: DeckItem[];
};

export const TableArticle = ({ className, decks }: Props) => {
  return (
    <Table.Root className={clsx(s.table, className)}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Name</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Cards</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Last Updated</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Created by</Typography>
          </Table.HeadCell>
          <Table.HeadCell />
        </Table.Row>
      </Table.Head>
      <Table.Body></Table.Body>
    </Table.Root>
  );
};
