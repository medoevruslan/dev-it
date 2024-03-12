import clsx from 'clsx';

import { Table } from '@/src/components/ui/table';
import { Typography } from '@/src/components/ui/typography';
import { Article } from '@/src/services/types';
import { Icon } from '../ui/icon';
import { Sort } from '@/src/components/ui/sort';

type Props = {
  className?: string;
  articles: Article[];
  onChangeSort: (value: string) => void;
  sort: string;
};

export const TableArticle = ({
  className,
  articles,
  sort,
  onChangeSort,
}: Props) => {
  return (
    <Table.Root className={clsx('w-full', className)}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography variant={'subtitle2'}>
              Title
              <Sort sort={sort} value={'title'} onChange={onChangeSort} />
            </Typography>
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
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {articles?.length &&
          articles.map((article) => (
            <Table.Row key={article.link + article.title}>
              <Table.Cell>
                <div title={article.title} className={'w-[100px] truncate'}>
                  {article.title}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className={'w-[200px] truncate'}>{article.content}</div>
              </Table.Cell>
              <Table.Cell>
                <div className={'w-[150px] truncate'}>
                  <Typography
                    title={article.link}
                    variant={'link1'}
                    href={article.link}
                  >
                    {article.link}
                  </Typography>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div title={article.author} className={'w-[200px] truncate'}>
                  {article.author}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className={'flex items-center gap-1.5'}>
                  <Icon
                    className={
                      'cursor-pointer transition hover:text-accent-500'
                    }
                    height={15}
                    name={'edit'}
                    // onClick={() => onEdit(cardId)}
                    style={{ marginRight: '10px' }}
                    width={15}
                  />
                  <Icon
                    className={
                      'cursor-pointer transition hover:text-accent-500'
                    }
                    height={15}
                    name={'delete'}
                    // onClick={() => onDelete(cardId)}
                    width={15}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};
