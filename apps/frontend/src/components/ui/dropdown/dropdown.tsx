import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Item as RadixDropDownItem } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import { Icon } from '@/src/components/ui/icon';

export type DropdownProps = {
  children?: React.ReactNode;
  className?: string;
  headerItem?: React.ReactNode;
  rootTrigger?: React.ReactNode;
};

export const Dropdown = ({
  children,
  className,
  headerItem,
  rootTrigger = (
    <Icon height={'24'} name={'more'} viewBox={'0 0 24 24'} width={'24'} />
  ),
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{rootTrigger}</DropdownMenu.Trigger>
      <DropdownMenu.Separator />
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={'end'}
          className={clsx(
            'bg-dark-700 border border-solid border-dark-500 p-3 rounded-md',
            className
          )}
        >
          {headerItem && (
            <>
              <DropdownMenu.Item
                className={'focus-visible:outline-none pointer-events-none'}
              >
                {headerItem}
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={'h-[1px] my-3 bg-dark-500'} />
            </>
          )}
          {children}
          <DropdownMenu.Arrow className={'fill-dark-700'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

type DropdownItemProps = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof RadixDropDownItem>;

export const DropdownItem = ({ children, ...props }: DropdownItemProps) => (
  <DropdownMenu.Item
    {...props}
    className={clsx(
      '[&+&]:mt-3 hover:text-accent-500 transition focus-visible:text-accent-500 focus-visible:transition focus-visible:outline-none',
      props?.className
    )}
  >
    {children}
  </DropdownMenu.Item>
);

export const DropdownItemSeparator = () => (
  <div className={'h-[1px] my-3 bg-dark-500'} />
);
