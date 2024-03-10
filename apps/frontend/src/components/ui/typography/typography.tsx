import React, { ComponentPropsWithoutRef, ElementType } from 'react';

import clsx from 'clsx';

const variantMapping = {
  body1: 'p',
  body2: 'p',
  caption: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  link1: 'a',
  link2: 'a',
  overline: 'p',
  subtitle1: 'h6',
  subtitle2: 'h6',
} as const;

const variantClassnames = {
  body1: 'text-m font-regular leading-m',
  body2: 'text-s font-regular leading-s',
  caption: 'text-xs font-regular leading-xs',
  h1: 'text-xxl font-bold leading-l',
  h2: 'text-xl font-bold leading-l',
  h3: 'text-l font-bold leading-l',
  h4: 'text-m font-bold leading-m',
  link1: 'text-info-500 font-regular text-info-500',
  link2: 'text-info-500 font-regular text-info-500',
  overline: 'text-xs font-regular leading-xs',
  subtitle1: 'text-base font-bold leading-l',
  subtitle2: 'text-base font-bold leading-l',
} as const;

type Props<T extends ElementType> = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
} & ComponentPropsWithoutRef<T>;
export const Typography = <T extends ElementType>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { children, className = '', style, variant, ...rest } = props;
  const Component = variantMapping[variant];

  return (
    <Component
      className={clsx(variantClassnames[variant], className)}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};
