import { useId } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import { type CheckboxProps } from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import { Icon } from '@/src/components/ui/icon';

export type CheckboxInputProps = {
  checked?: boolean | string;
  className?: string;
  defaultValue?: boolean;
  disabled?: boolean;
  label?: string;
} & Omit<CheckboxProps, 'checked' | 'defaultValue'>;

export const CheckboxInput = ({
  className,
  defaultValue,
  disabled,
  label,
  onCheckedChange,
  style,
}: CheckboxInputProps) => {
  const id = useId();

  return (
    <div
      className={clsx('relative z-[1] items-center flex gap-2', className)}
      style={style}
    >
      <Checkbox.Root
        className={
          'relative [&_svg]:disabled:text-dark-500 peer bg-transparent border border-solid border-light-900 rounded-sm w-4 h-4 flex items-center justify-center hover:after:-z-[1] hover:after:absolute hover:after:content-[""] hover:after:block hover:after:rounded-[50%] hover:after:w-9 hover:after:h-9 hover:after:bg-dark-500 data-[data-disabled]:pointer-events-none active:before:-z-[2] active:before:absolute active:before:content-[""] active:before:block active:before:rounded-[50%] active:before:w-9 active:before:h-9 active:before:bg-dark-100'
        }
        defaultChecked={defaultValue}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator className={'CheckboxIndicator'}>
          <Icon
            fill={'none'}
            height={'18'}
            name={'checkbox'}
            style={{ display: 'block' }}
            viewBox={'0 0 18 18'}
            width={'18'}
            className={'block text-light-100'}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <label
          className={
            'peer-disabled:text-dark-500  peer-disabled:pointer-events-none text-s text-light-100 leading-m cursor-pointer'
          }
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
