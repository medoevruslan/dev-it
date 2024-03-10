import { ComponentProps } from 'react';
import clsx from 'clsx';

export const Container = (props: ComponentProps<'div'>) => {
  return (
    <div
      className={clsx(
        'max-w-[1180px] w-full mx-auto px-[40px]',
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};
