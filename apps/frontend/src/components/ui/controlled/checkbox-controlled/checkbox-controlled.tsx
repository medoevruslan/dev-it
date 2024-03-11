import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {
  CheckboxInput,
  CheckboxInputProps,
} from '@/src/components/ui/checkbox';

export type CheckboxControlledProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<
    CheckboxInputProps,
    'checked' | 'defaultValue' | 'id' | 'onChange' | 'value'
  >;

export const CheckboxControlled = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...checkboxProps
}: CheckboxControlledProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    disabled: checkboxProps.disabled,
    name,
    shouldUnregister,
  });

  return (
    <CheckboxInput
      checked={value}
      id={name}
      onCheckedChange={onChange}
      {...checkboxProps}
    />
  );
};
