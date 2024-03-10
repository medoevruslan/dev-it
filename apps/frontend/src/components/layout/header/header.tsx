import { ComponentProps } from 'react';
import { Container } from '@/src/components/container/container';

export const Header = ({
  children,
  className,
  ...rest
}: ComponentProps<'header'>) => {
  return (
    <header className="w-full bg-dark-700 border-b border-b-dark-500 px-[12px] py-2">
      <Container>Header</Container>
    </header>
  );
};
