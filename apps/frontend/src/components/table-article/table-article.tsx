import clsx from 'clsx';

import { Table } from '@/src/components/ui/table';
import { Typography } from '@/src/components/ui/typography';
import { Article } from '@/src/services/types';

type Props = {
  className?: string;
  articles: Article[];
};

export const TableArticle = ({ className, articles }: Props) => {
  return (
    <Table.Root className={clsx('w-full', className)}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Title</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Content</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Link</Typography>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>Created by</Typography>
          </Table.HeadCell>
          <Table.HeadCell />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {articles?.length &&
          articles.map((article) => (
            <Table.Row key={article.link + article.title}>
              <Table.Cell className={'w-[300px]'}>{article.title}</Table.Cell>
              <Table.Cell className={'w-[300px] truncate'}>
                {article.content}
              </Table.Cell>
              <Table.Cell className={'w-[300px] truncate'}>
                {article.link}
              </Table.Cell>
              <Table.Cell className={'w-[300px]'}>{article.author}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};
