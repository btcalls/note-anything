import { Controller, FieldValues } from 'react-hook-form';
import { View, ViewProps } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import type { FormTagsProps } from '~/constants/types';
import { cn } from '~/lib/utils';

import SelectableTagPill from '../lists/tags/SelectableTagPill';

type Props<T extends FieldValues> = FormTagsProps<T> & Pick<ViewProps, 'className'>;

export default function FormTagsRow<T extends FieldValues>({
  name,
  control,
  rules,
  tags,
  label,
  className,
}: Props<T>) {
  const viewStyle = cn({
    'flex-1 gap-2': true,
    [`${className}`]: !!className,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <View className={viewStyle}>
          {label && (
            <ThemedText type="subtitle" className="w-full">
              {label}
            </ThemedText>
          )}

          <View className="flex-row flex-wrap gap-4">
            {tags.map((tag) => (
              <SelectableTagPill
                key={`${tag.id}`}
                tag={tag}
                isSelected={value.findIndex((i: number) => i == tag.id) > -1}
                onToggle={(id, isSelected) => {
                  if (id != tag.id) {
                    return;
                  }

                  // Either remove or add id from values
                  if (isSelected) {
                    onChange([...value, id]);
                  } else {
                    onChange(value.filter((i: number) => i != id));
                  }
                }}
              />
            ))}
          </View>
        </View>
      )}
    />
  );
}
