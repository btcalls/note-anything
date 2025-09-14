import type { Control, FieldError, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TextInput, View, type TextInputProps } from 'react-native';

import { cn } from '~/lib/utils';

import { ThemedText } from './ThemedText';

interface FormFieldProps<T extends FieldValues>
  extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'onBlur' | 'ref'> {
  name: Path<T>;
  control: Control<T>;
  rules?:
    | Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>
    | undefined;
  label?: string;
  error?: FieldError | undefined;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  error,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <View className="w-full gap-2 items-center">
          {label && (
            <ThemedText type="subtitle" className="w-full">
              {label}
            </ThemedText>
          )}

          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={ref}
            className={cn({
              'w-full border border-gray-400 h-16 px-4 rounded-lg': true,
              'border-2 border-red-500': !!error,
            })}
            {...inputProps}
          />
        </View>
      )}
    />
  );
}
