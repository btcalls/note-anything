import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { FormTextInputProps } from '~/constants/types';
import { cn } from '~/lib/utils';

import { ThemedText } from '../ThemedText';

export default function FormTextInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  error,
  ...inputProps
}: FormTextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <View className="w-full items-center gap-2">
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
              'h-16 w-full rounded-lg border border-gray-400 px-4': true,
              'border-2 border-red-500': !!error,
            })}
            {...inputProps}
          />
        </View>
      )}
    />
  );
}
