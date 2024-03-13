import clsx from 'clsx';

import { Table } from '@/src/components/ui/table';
import { Typography } from '@/src/components/ui/typography';
import { Article } from '@/src/services/types';
import { Icon } from '../ui/icon';
import { Sort } from '@/src/components/ui/sort';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  useDeleteArticleMutation,
  useEditArticleMutation,
} from '@/src/services/articles/articles.service';
import { ArticleModal } from '@/src/components/article-modal';
import { useMeQuery } from '@/src/services/auth/auth.service';
import { EditArticleFormValues } from '@/src/schema/article.schema';

type Props = {
  className?: string;
  articles: Article[];
  onChangeSort: (value: string) => void;
  sort: string;
};

export const ArticleTable = ({
  className,
  articles,
  sort,
  onChangeSort,
}: Props) => {
  const params = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  const { data: user, isError } = useMeQuery();

  const [isOpenModal, setIsOpenModal] = useState(!!params?.articleId);
  const [deleteArticle] = useDeleteArticleMutation();

  const [updateArticle] = useEditArticleMutation();

  useEffect(() => {
    setIsOpenModal(!!params?.articleId);
  }, [params?.articleId]);

  const handleDelete = async (articleId: string) => {
    await deleteArticle({ articleId });
  };
  const handleCloseModal = (value: boolean) => {
    setIsOpenModal(value);
    navigate('/');
  };

  const handleSubmit = async (
    articleId: string,
    data: EditArticleFormValues
  ) => {
    await updateArticle({ articleId, data });
  };

  return (
    <>
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
              <Typography variant={'subtitle2'}>
                Content
                <Sort sort={sort} value={'content'} onChange={onChangeSort} />
              </Typography>
            </Table.HeadCell>
            <Table.HeadCell>
              <Typography variant={'subtitle2'}>
                Link
                <Sort sort={sort} value={'link'} onChange={onChangeSort} />
              </Typography>
            </Table.HeadCell>
            <Table.HeadCell>
              <Typography variant={'subtitle2'}>
                Created by
                <Sort sort={sort} value={'author'} onChange={onChangeSort} />
              </Typography>
            </Table.HeadCell>
            {user && !isError && <Table.HeadCell>Action</Table.HeadCell>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {articles?.length &&
            articles.map((article) => (
              <Table.Row
                key={article.link + article.title}
                className={'hover:bg-dark-300'}
              >
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
                {user && !isError && (
                  <Table.Cell>
                    <div className={'flex items-center gap-1.5'}>
                      <Link to={`/edit/${article.id}`}>
                        <Icon
                          className={
                            'cursor-pointer transition hover:text-accent-500'
                          }
                          height={15}
                          name={'edit'}
                          style={{ marginRight: '10px' }}
                          width={15}
                        />
                      </Link>
                      <Icon
                        className={
                          'cursor-pointer transition hover:text-accent-500'
                        }
                        height={15}
                        name={'delete'}
                        onClick={() => handleDelete(article.id)}
                        width={15}
                      />
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      <ArticleModal
        articleId={params.articleId}
        isOpen={isOpenModal}
        onSubmit={handleSubmit}
        setIsOpen={handleCloseModal}
      />
    </>
  );
};
