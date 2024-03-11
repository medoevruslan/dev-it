import { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

type CardBlockTypes = 'article' | 'div' | 'section' | 'span';

export type CardProps = {
  as?: CardBlockTypes;
} & ComponentPropsWithoutRef<CardBlockTypes>;

export const Card = (props: CardProps) => {
  const { as: Component = 'div', children, className = '', ...rest } = props;

  return (
    <Component
      className={clsx('bg-dark-700 border border-dark-400 p-2.5', className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
