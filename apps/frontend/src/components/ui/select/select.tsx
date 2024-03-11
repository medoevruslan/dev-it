import React from 'react';

import * as SelectRadix from '@radix-ui/react-select';
import {
  type SelectProps as RadixSelectProps,
  SelectItemProps,
} from '@radix-ui/react-select';
import clsx from 'clsx';

import { Icon } from '../icon';
import { Typography } from '@/src/components/ui/typography';

export type SelectProps = {
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
} & RadixSelectProps;
export const Select = ({
  children,
  className,
  defaultValue,
  disabled,
  onValueChange,
  placeholder,
  style,
  open,
}: SelectProps) => {
  return (
    <SelectRadix.Root
      open={open}
      disabled={disabled}
      onValueChange={onValueChange}
    >
      <SelectRadix.Trigger
        className={clsx(
          'min-w-[210px] bg-transparent py-1.5 px-4 flex justify-between items-center border border-solid border-dark-300 rounded-sm focus-visible:outline-[2px] focus-visible:text-info-700 hover:bg-dark-500 [&_svg]:data-[data-state="open"]:text-accent-500 disabled:pointer-events-none disabled:text-dark-300 [&_svg}:disabled:text-dark-300',
          className
        )}
        style={style}
      >
        <SelectRadix.Value
          placeholder={placeholder || defaultValue || 'Select'}
        />
        <SelectRadix.Icon>
          <Icon height={10} name={'chevron-down'} width={10} />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content
          className={
            'bg-transparent flex border border-solid border-dark-300 w-radix-select-trigger-width'
          }
          position={'popper'}
          sideOffset={-6}
          style={style}
        >
          <SelectRadix.Viewport>{children}</SelectRadix.Viewport>
          <SelectRadix.Arrow />
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};

type OptionProps = {
  children?: React.ReactNode;
} & SelectItemProps;

export const SelectOption = React.forwardRef<HTMLDivElement, OptionProps>(
  (
    {
      children,
      className,
      ...rest
    }: OptionProps & Omit<SelectItemProps, keyof OptionProps>,
    forwardedRef
  ) => {
    return (
      <SelectRadix.Item
        className={clsx(
          'py-1.5 px-3 bg-black hover:outline-none hover:bg-accent-900 focus-visible:outline-none',
          className
        )}
        {...rest}
        ref={forwardedRef}
      >
        <SelectRadix.ItemText>
          <Typography variant={'body1'}>{children}</Typography>
        </SelectRadix.ItemText>
      </SelectRadix.Item>
    );
  }
);
