import { ComponentProps, ElementRef, forwardRef } from 'react';

import clsx from 'clsx';

export type RootProps = ComponentProps<'table'>;
const Root = ({ children, className, ...props }: RootProps) => (
  <table
    className={clsx('text-light-100 border-collapse', className)}
    {...props}
  >
    {children}
  </table>
);

export type THeadProps = ComponentProps<'thead'>;
const Head = forwardRef<ElementRef<'thead'>, THeadProps>(
  ({ children, className, ...props }, ref) => (
    <thead
      className={clsx('bg-dark-500 !border-0', className)}
      ref={ref}
      {...props}
    >
      {children}
    </thead>
  )
);

export type THeadCellProps = ComponentProps<'th'>;
const HeadCell = forwardRef<ElementRef<'th'>, THeadCellProps>(
  ({ children, className, ...props }, ref) => (
    <th
      className={clsx('py-[6px] px-[24px] text-left', className)}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  )
);

export type TBodyProps = ComponentProps<'tbody'>;
const Body = forwardRef<ElementRef<'tbody'>, TBodyProps>(
  ({ children, className, ...props }, ref) => (
    <tbody className={clsx(className)} ref={ref} {...props}>
      {children}
    </tbody>
  )
);

export type TCellProps = ComponentProps<'td'>;
const Cell = forwardRef<ElementRef<'td'>, TCellProps>(
  ({ children, className, ...props }, ref) => (
    <td className={clsx('py-[6px] px-[24px]', className)} ref={ref} {...props}>
      {children}
    </td>
  )
);

export type TRowProps = ComponentProps<'tr'>;
const Row = forwardRef<ElementRef<'tr'>, TRowProps>(
  ({ children, className, ...props }, ref) => (
    <tr
      className={clsx(
        'bg-transparent border-b-[1px] border-b-dark-300 border-solid',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  )
);

export const Table = {
  Body,
  Cell,
  Head,
  HeadCell,
  Root,
  Row,
};
