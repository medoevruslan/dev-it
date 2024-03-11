import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react';

import clsx from 'clsx';

import { Typography } from '@/src/components/ui/typography';

export type InputProps = {
  clearInput?: () => void;
  disabled?: boolean;
  error?: React.ReactNode;
  label?: string;
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: 'password' | 'search';
} & ComponentPropsWithoutRef<'input'>;
export const Input = forwardRef<
  ElementRef<'input'>,
  InputProps & Omit<ComponentPropsWithoutRef<'input'>, keyof InputProps>
>(
  (
    {
      className,
      clearInput,
      error,
      label,
      onChange,
      onChangeText,
      onEnter,
      onKeyPress,
      placeholder,
      type,
      value,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onChangeText?.(e.currentTarget.value);
    };
    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyPress?.(e);
      onEnter && e.key === 'Enter' && onEnter();
    };

    const handleToggleShowPassport = () => {
      setShowPassword(!showPassword);
    };

    const handleClearInput = () => {
      clearInput?.();
    };

    const inputType =
      type === 'password' && !showPassword ? 'password' : 'text';
    const showClearInputBtn = !!value && clearInput && type === 'search';
    const shouldAutocomplete =
      type === 'search' && inputType === 'password' ? 'off' : 'on';

    return (
      <div
        className={clsx('relative w-[284px] max-w-full', className)}
        {...rest}
      >
        {label && (
          <label
            className={'text-s text-dark-100 block relative top-0'}
            htmlFor={'default-input'}
          >
            {label}
          </label>
        )}
        <div className={'relative w-full flex'}>
          {showClearInputBtn && (
            <span
              className={
                "absolute right-[10px] top-1/2 -translate-y-1/2 h-2 w-2 bg-light-100 mask-[url('../assets/close.svg')] cursor-pointer"
              }
              onClick={handleClearInput}
            />
          )}
          {type === 'search' && (
            <span
              className={
                "absolute left-[10px] h-4 w-4 top-1/2 -translate-y-1/2 bg-dark-300 mask-[url('../assets/search.svg')] mask-no-repeat cursor-pointer [&:has(~input:focus)]:bg-light-100  [&:has(~input:disabled)]:bg-dark-500"
              }
              onClick={onEnter}
            />
          )}
          {type === 'password' && (
            <span
              className={
                "absolute h-5 w-5 right-[10px] top-1/2 -translate-y-1/2 bg-light-100 mask-[url('../assets/eye-outline.svg')] mask-no-repeat cursor-pointer [&:has(~input:disabled)]:bg-dark-500"
              }
              onMouseDown={handleToggleShowPassport}
              onMouseUp={handleToggleShowPassport}
            />
          )}
          <input
            autoComplete={shouldAutocomplete}
            className={clsx(
              'w-full px-3 py-2 rounded-sm border border-dark-300 bg-transparent outline-none hover:bg-dark-700 disabled:border-dark-500 disabled:text-dark-100',
              error &&
                'border-danger-300 text-danger-300 placeholder:text-danger-300',
              type === 'search' && 'pl-[40px]'
            )}
            id={'default-input'}
            onChange={handleOnChange}
            onKeyPress={handleKeypress}
            placeholder={placeholder}
            ref={ref}
            type={inputType}
            value={value}
            {...rest}
          />
        </div>
        {error && (
          <Typography className={'text-danger-300'} variant={'caption'}>
            {error}
          </Typography>
        )}
      </div>
    );
  }
);
