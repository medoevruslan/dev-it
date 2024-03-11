import { ComponentProps } from 'react';

import clsx from 'clsx';

import { usePagination } from '@/src/hooks/usePagination';
import { Typography } from '@/src/components/ui/typography';
import { Icon } from '../icon';
import { Select, SelectOption } from '../select';
import { Link } from 'react-router-dom';

export type PaginationProps = {
  currentPage?: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  totalCount: number;
} & ComponentProps<'div'>;

export const Pagination = ({
  children,
  className,
  currentPage = 1,
  onPageChange,
  siblingCount,
  totalCount,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalCount,
  });

  const isDots = (el: unknown) => el === '...';
  const isActive = (num: number | string) =>
    !isDots(num) && num === currentPage;
  const lastPage = totalCount;

  const handleForward = () => onPageChange(currentPage + 1);

  const handleBackward = () => onPageChange(currentPage - 1);

  const handleClick = (page: number | string) => {
    const number = Number(page);

    if (!isNaN(number)) {
      page !== currentPage && onPageChange(number);
    }
  };

  const pages = paginationRange.map((el, idx) => {
    return (
      <Link
        className={clsx(
          'w-6 h-6 bg-transparent rounded-sm cursor-pointer text-center',
          isActive(el) && 'bg-dark-100',
          isDots(el) && 'pointer-events-none'
        )}
        to={'javascript:void;'}
        key={idx}
        onClick={() => handleClick(el)}
      >
        <Typography variant={'body2'}>{el}</Typography>
      </Link>
    );
  });

  return (
    <div className={clsx('flex items-center gap-6', className)}>
      <div className={'flex items-center gap-3'}>
        <button
          className={
            'cursor-pointer transition flex items-center hover:text-accent-500 disabled:pointer-events-none [&_svg]:disabled:text-dark-100'
          }
          disabled={currentPage <= 1}
          onClick={handleBackward}
        >
          <Icon height={16} name={'arrow-back'} width={16} />
        </button>
        {pages}
        <button
          className={
            'cursor-pointer transition flex items-center hover:text-accent-500 disabled:pointer-events-none [&_svg]:disabled:text-dark-100'
          }
          disabled={currentPage >= lastPage}
          onClick={handleForward}
        >
          <Icon height={16} name={'arrow-forward'} width={16} />
        </button>
      </div>
      {children}
    </div>
  );
};

export type PostsPerPageProps<T extends string> = {
  onChange: (value: T) => void;
  options: Readonly<T[]>;
};

export const PostsPerPage = <T extends string>({
  onChange,
  options,
}: PostsPerPageProps<T>) => {
  return (
    <div className={'flex gap-1.5'}>
      <Typography variant={'body2'}>Показать</Typography>
      <Select
        className={'px-1.5 gap-[10px] min-w-0'}
        onValueChange={onChange}
        placeholder={options[0]}
      >
        {options.map((opt) => (
          <SelectOption key={opt} value={opt}>
            {opt}
          </SelectOption>
        ))}
      </Select>
      <Typography variant={'body2'}>на странице</Typography>
    </div>
  );
};
