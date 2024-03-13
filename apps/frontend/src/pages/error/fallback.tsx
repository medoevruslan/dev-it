import { Typography } from '@/src/components/ui/typography';
import { Button } from '@/src/components/ui/button';
import { FallbackProps } from 'react-error-boundary';

export const FallbackPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="main-content-container p-5">
      <div className="page-header mb-4">
        <Typography variant={'h1'}>Error</Typography>
        <Typography variant={'subtitle1'}>
          This should not have happened
        </Typography>
      </div>
      <div className="page-header mb-4">
        <div>
          <p>Something went wrong:</p>
          <pre>
            <code className="text-warning">{error!.message}</code>
          </pre>
        </div>
      </div>
      <div className="page-header">
        <div>
          <Button variant={'outlined'} onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};
