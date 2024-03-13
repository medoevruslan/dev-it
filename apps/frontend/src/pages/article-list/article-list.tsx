import { Container } from '@/src/components/container/container';
import { Typography } from '@/src/components/ui/typography';
import {
  useGetArticlesQuery,
  useParseMutation,
} from '@/src/services/articles/articles.service';
import { ArticleTable } from '@/src/components/article-table/article-table';
import { Pagination, PostsPerPage } from '@/src/components/ui/pagination';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { useDebounce } from 'use-debounce';
import { Button } from '@/src/components/ui/button';
import { toast } from 'react-toastify';

const postsOnPage = ['10', '20', '30', '50', '100'] as const;

export const ArticleList = () => {
  const [searchArticles, setSearchArticles] = useState('');
  const [sort, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] =
    useState<(typeof postsOnPage)[number]>('10');

  const {
    data: articles,
    isLoading,
    isError,
    isFetching,
  } = useGetArticlesQuery({
    name: useDebounce(searchArticles, 700)[0],
    currentPage: page,
    itemsPerPage: Number(postsPerPage),
    orderBy: sort,
  });

  const [parseArticles] = useParseMutation();

  const handleChangePostsPerPage = handleChangeWithPageReset(
    setPage,
    setPostsPerPage
  );

  const handleSearchArticles = handleChangeWithPageReset(
    setPage,
    setSearchArticles
  );

  const handleParseArticles = async () => {
    try {
      const response = await parseArticles().unwrap();
      toast.success(response.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onChangeSort = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  if (isLoading) {
    return <Typography variant={'body1'}>Loading...</Typography>;
  }

  if (!articles?.pagination.totalItems && !isLoading && !isError) {
    return (
      <Container className={'flex flex-col items-center justify-center mt-20'}>
        <Typography className={'text-center mb-6'} variant={'h2'}>
          There is no items in the table
        </Typography>
        <Button
          onClick={handleParseArticles}
          disabled={isFetching || isLoading}
          variant={'primary'}
        >
          Parse Articles
        </Button>
      </Container>
    );
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
      <ArticleTable
        onChangeSort={onChangeSort}
        sort={sort}
        isLoading={isLoading || isFetching}
        articles={articles?.items || []}
        className={'mb-5'}
      ></ArticleTable>
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
