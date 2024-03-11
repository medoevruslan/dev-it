import React, { ComponentPropsWithoutRef, ElementType } from 'react';

import { Typography } from '../typography';
import clsx from 'clsx';

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  fullwidth?: boolean;
  variant: 'outlined' | 'primary' | 'secondary';
} & ComponentPropsWithoutRef<T>;

const variantClassMap = {
  outlined:
    'bg-transparent border border-solid border-dark-400 hover:border-accent-500',
  primary: 'bg-accent-500 hover:bg-accent-300',
  secondary: 'bg-dark-300 hover:bg-accent-300',
};

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className = '',
    fullwidth,
    variant = 'primary',
    ...rest
  } = props;

  return (
    <Component
      className={clsx(
        'cursor-pointer px-7 py-1 rounded-sm focus-visible:outline-[1px] focus-visible:outline-info-700',
        variantClassMap[variant],
        fullwidth && 'w-full text-center block',
        className
      )}
      {...rest}
    >
      <Typography
        className={'flex items-center justify-center'}
        variant={'subtitle2'}
      >
        {children}
      </Typography>
    </Component>
  );
};
