import { Container } from '@/src/components/container/container';
import { Typography } from '@/src/components/ui/typography';
import { useGetArticlesQuery } from '@/src/services/articles/articles.service';
import { TableArticle } from '@/src/components/table-article/table-article';

const postsOnPage = ['10', '20', '30', '50', '100'] as const;

export const MAX_COVER_FILE_SIZE = 5 * 128 * 1024;

export const ArticleList = () => {
  const { data: articles, isLoading, isError } = useGetArticlesQuery();

  if (isLoading) {
    return <Typography variant={'body1'}>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant={'h1'}>Articles page</Typography>
      <TableArticle articles={articles?.data || []}></TableArticle>
      {/*<Button onClick={() => parse()} variant={'primary'}>*/}
      {/*  Parse*/}
      {/*</Button>*/}
    </Container>
  );
};
