import { Container } from '@/src/components/container/container';
import { Typography } from '@/src/components/ui/typography';
import { useGetArticlesQuery } from '@/src/services/articles/articles.service';
import { TableArticle } from '@/src/components/article-table/table-article';
import { Pagination, PostsPerPage } from '@/src/components/ui/pagination';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { useDebounce } from 'use-debounce';

const postsOnPage = ['10', '20', '30', '50', '100'] as const;

export const ArticleList = () => {
  const [searchArticles, setSearchArticles] = useState('');
  const [sort, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] =
    useState<(typeof postsOnPage)[number]>('10');

  const { data: articles, isLoading } = useGetArticlesQuery({
    name: useDebounce(searchArticles, 700)[0],
    currentPage: page,
    itemsPerPage: Number(postsPerPage),
    orderBy: sort,
  });

  const handleChangePostsPerPage = handleChangeWithPageReset(
    setPage,
    setPostsPerPage
  );

  const handleSearchArticles = handleChangeWithPageReset(
    setPage,
    setSearchArticles
  );

  const onChangeSort = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  if (isLoading) {
    return <Typography variant={'body1'}>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography className={'my-8'} variant={'h1'}>
        Articles page
      </Typography>
      <Input
        type={'search'}
        className={'mb-5'}
        label={'Search article'}
        value={searchArticles}
        onChangeText={handleSearchArticles}
        clearInput={() => handleSearchArticles('')}
      />
      <TableArticle
        onChangeSort={onChangeSort}
        sort={sort}
        articles={articles?.items || []}
        className={'mb-5'}
      ></TableArticle>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalCount={articles?.pagination?.totalPages || 10}
      >
        <PostsPerPage
          onChange={handleChangePostsPerPage}
          options={postsOnPage}
        />
      </Pagination>
    </Container>
  );
};

export const handleChangeWithPageReset = <T,>(
  pageReset: (page: number) => void,
  callback: (...args: T[]) => void
) => {
  return (...args: T[]) => {
    pageReset(1);
    callback(...args);
  };
};
